# Modelo de datos — PasanakuYa

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `participantes.grupo_id` | `grupos` | Al borrar el padre se borran los hijos |
| `rondas.grupo_id` | `grupos` | Al borrar el padre se borran los hijos |
| `rondas.beneficiario_id` | `participantes` | Sin borrado en cascada |
| `aportes.ronda_id` | `rondas` | Al borrar el padre se borran los hijos |
| `aportes.participante_id` | `participantes` | Al borrar el padre se borran los hijos |

```
grupos  ──<  participantes, rondas
participantes  ──<  rondas, aportes
rondas  ──<  aportes
aportes
```

## 3. Detalle por tabla

### 3.1 `grupos`

Cada pasanaku: monto fijo, frecuencia y fecha de inicio.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `monto_aporte` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |
| `frecuencia` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `semanal`, `quincenal`, `mensual`; Valor inicial `semanal` | «Elegí una opción» |
| `fecha_inicio` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_grupos_fecha_inicio ON grupos(fecha_inicio);
```

**Consultas base** (en `src/db/grupos.ts`):

```ts
listar(): Promise<Grupo[]>            // SELECT * FROM grupos ORDER BY id DESC
obtener(id: number): Promise<Grupo | null>   // SELECT * FROM grupos WHERE id = ?
crear(datos: NuevoGrupo): Promise<number>   // INSERT INTO grupos (nombre, monto_aporte, frecuencia, fecha_inicio) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoGrupo): Promise<void>   // UPDATE grupos SET nombre = ?, monto_aporte = ?, frecuencia = ?, fecha_inicio = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM grupos WHERE id = ?
```

### 3.2 `participantes`

Integrantes del grupo con su turno de cobro.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `grupo_id` | INTEGER → `number` | Selector de grupos | Obligatorio; Debe existir en `grupos` | «Elegí un registro» |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |
| `turno` | INTEGER → `number \| null` | Numérico entero | Opcional; Entero mayor o igual a 0 | «Ingresá un número entero» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_participantes_grupo_id ON participantes(grupo_id);
```

**Consultas base** (en `src/db/participantes.ts`):

```ts
listar(): Promise<Participante[]>            // SELECT * FROM participantes ORDER BY id DESC
obtener(id: number): Promise<Participante | null>   // SELECT * FROM participantes WHERE id = ?
crear(datos: NuevoParticipante): Promise<number>   // INSERT INTO participantes (grupo_id, nombre, telefono, turno) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoParticipante): Promise<void>   // UPDATE participantes SET grupo_id = ?, nombre = ?, telefono = ?, turno = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM participantes WHERE id = ?
listarPorGrupo(grupo_id: number): Promise<Participante[]>   // WHERE grupo_id = ?
```

### 3.3 `rondas`

Una ronda por turno; guarda el beneficiario y la fecha.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `grupo_id` | INTEGER → `number` | Selector de grupos | Obligatorio; Debe existir en `grupos` | «Elegí un registro» |
| `numero` | INTEGER → `number` | Numérico entero | Obligatorio; Entero mayor o igual a 0 | «Ingresá un número entero» |
| `beneficiario_id` | INTEGER → `number \| null` | Selector de participantes | Opcional; Debe existir en `participantes` | «Elegí un registro» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_rondas_grupo_id ON rondas(grupo_id);
CREATE INDEX IF NOT EXISTS idx_rondas_beneficiario_id ON rondas(beneficiario_id);
CREATE INDEX IF NOT EXISTS idx_rondas_fecha ON rondas(fecha);
```

**Consultas base** (en `src/db/rondas.ts`):

```ts
listar(): Promise<Ronda[]>            // SELECT * FROM rondas ORDER BY id DESC
obtener(id: number): Promise<Ronda | null>   // SELECT * FROM rondas WHERE id = ?
crear(datos: NuevoRonda): Promise<number>   // INSERT INTO rondas (grupo_id, numero, beneficiario_id, fecha) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoRonda): Promise<void>   // UPDATE rondas SET grupo_id = ?, numero = ?, beneficiario_id = ?, fecha = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM rondas WHERE id = ?
listarPorGrupo(grupo_id: number): Promise<Ronda[]>   // WHERE grupo_id = ?
listarPorBeneficiario(beneficiario_id: number): Promise<Ronda[]>   // WHERE beneficiario_id = ?
```

### 3.4 `aportes`

Lo que cada participante debe aportar en cada ronda.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `ronda_id` | INTEGER → `number` | Selector de rondas | Obligatorio; Debe existir en `rondas` | «Elegí un registro» |
| `participante_id` | INTEGER → `number` | Selector de participantes | Obligatorio; Debe existir en `participantes` | «Elegí un registro» |
| `monto` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |
| `fecha` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `pagado` | INTEGER → `number` | Interruptor | Obligatorio; 0 o 1; Valor inicial `0` | — |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_aportes_ronda_id ON aportes(ronda_id);
CREATE INDEX IF NOT EXISTS idx_aportes_participante_id ON aportes(participante_id);
CREATE INDEX IF NOT EXISTS idx_aportes_fecha ON aportes(fecha);
```

**Consultas base** (en `src/db/aportes.ts`):

```ts
listar(): Promise<Aporte[]>            // SELECT * FROM aportes ORDER BY id DESC
obtener(id: number): Promise<Aporte | null>   // SELECT * FROM aportes WHERE id = ?
crear(datos: NuevoAporte): Promise<number>   // INSERT INTO aportes (ronda_id, participante_id, monto, fecha, pagado) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoAporte): Promise<void>   // UPDATE aportes SET ronda_id = ?, participante_id = ?, monto = ?, fecha = ?, pagado = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM aportes WHERE id = ?
listarPorRonda(ronda_id: number): Promise<Aporte[]>   // WHERE ronda_id = ?
listarPorParticipante(participante_id: number): Promise<Aporte[]>   // WHERE participante_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Grupo {
  id: number;
  nombre: string;
  monto_aporte: number;
  frecuencia: string;
  fecha_inicio: string;
}
export type NuevoGrupo = Omit<Grupo, 'id'>;

export interface Participante {
  id: number;
  grupo_id: number;
  nombre: string;
  telefono: string | null;
  turno: number | null;
}
export type NuevoParticipante = Omit<Participante, 'id'>;

export interface Ronda {
  id: number;
  grupo_id: number;
  numero: number;
  beneficiario_id: number | null;
  fecha: string;
}
export type NuevoRonda = Omit<Ronda, 'id'>;

export interface Aporte {
  id: number;
  ronda_id: number;
  participante_id: number;
  monto: number;
  fecha: string | null;
  pagado: number;
}
export type NuevoAporte = Omit<Aporte, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

SQLite no tiene tipo enumerado: se valida en la capa de datos y se muestra con la etiqueta de la tabla.

**`grupos.frecuencia`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `semanal` | Semanal |
| `quincenal` | Quincenal |
| `mensual` | Mensual |

```ts
export const GRUPOS_FRECUENCIA = ['semanal', 'quincenal', 'mensual'] as const;
```

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 5 | Guardar la plantilla del mensaje de cobro y las preferencias de recordatorio. |

**Migración 2** (fase 5)

```sql
CREATE TABLE ajustes (clave TEXT PRIMARY KEY, valor TEXT NOT NULL);
```

## 7. Esquema inicial completo

```sql
CREATE TABLE grupos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, monto_aporte REAL NOT NULL, frecuencia TEXT NOT NULL DEFAULT 'semanal', fecha_inicio TEXT NOT NULL);
CREATE TABLE participantes (id INTEGER PRIMARY KEY AUTOINCREMENT, grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE, nombre TEXT NOT NULL, telefono TEXT, turno INTEGER);
CREATE TABLE rondas (id INTEGER PRIMARY KEY AUTOINCREMENT, grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE, numero INTEGER NOT NULL, beneficiario_id INTEGER REFERENCES participantes(id), fecha TEXT NOT NULL);
CREATE TABLE aportes (id INTEGER PRIMARY KEY AUTOINCREMENT, ronda_id INTEGER NOT NULL REFERENCES rondas(id) ON DELETE CASCADE, participante_id INTEGER NOT NULL REFERENCES participantes(id) ON DELETE CASCADE, monto REAL NOT NULL, fecha TEXT, pagado INTEGER NOT NULL DEFAULT 0);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** Cada participante aporta el monto fijo del grupo en cada ronda, incluido el beneficiario.
- **RN-02** Hay tantas rondas como participantes; la ronda N le paga al participante con turno N.
- **RN-03** No puede haber dos participantes con el mismo turno dentro de un grupo.
- **RN-04** El sorteo de turnos solo se permite antes de que empiece la primera ronda.
- **RN-05** El pozo de una ronda es monto_aporte × cantidad de participantes.
- **RN-06** La fecha de cada ronda se calcula desde fecha_inicio: semanal +7 días, quincenal +14, mensual +1 mes calendario.
- **RN-07** Una ronda se cierra cuando todos aportaron, o cuando el organizador confirma cerrarla con deudas (quedan marcadas como pendientes).

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
