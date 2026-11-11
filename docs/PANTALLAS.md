# Pantallas y flujos — PasanakuYa

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Formulario de grupo | `app/formulario-de-grupo.tsx` | Formulario |
| Detalle de grupo | `app/detalle-de-grupo.tsx` | Detalle |
| Formulario de participante | `app/formulario-de-participante.tsx` | Formulario |
| Detalle de ronda | `app/detalle-de-ronda.tsx` | Detalle |
| Ajustes | `app/ajustes.tsx` | Lista / vista |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Lista de grupos con la ronda actual (X de N), el pozo y la cantidad de deudores
- **Acciones:** Crear grupo, abrir grupo

**Bosquejo**

```
┌──────────────────────────────┐
│ PasanakuYa                   │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Detalle de grupo         │
│  ▸ Detalle de ronda         │
│  ▸ Ajustes                  │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Lista de grupos con la ronda actual (X de N), el pozo y la cantidad de deudores |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Formulario de grupo

- **Archivo:** `app/formulario-de-grupo.tsx`
- **Qué muestra:** Nombre, monto de aporte, frecuencia, fecha de inicio
- **Acciones:** Guardar, cancelar
- **Historias relacionadas:** HU-01, HU-03, HU-04, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| nombre | Texto | Sí | Texto de 1 a 80 caracteres sin espacios sobrantes |
| monto aporte | Numérico decimal | Sí | Mayor a 0; Hasta 2 decimales |
| frecuencia | Selector / fichas | Sí | Uno de: `semanal`, `quincenal`, `mensual` |
| fecha inicio | Fecha | Sí | Fecha real en formato AAAA-MM-DD |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de grupo         │
├──────────────────────────────┤
│ nombre                       │
│ [____________________]       │
│ monto aporte                 │
│ [____________________]       │
│ frecuencia                   │
│ [____________________]       │
│ fecha inicio                 │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay grupos. Tocá «Guardar» para empezar. |
| Con datos | Nombre, monto de aporte, frecuencia, fecha de inicio |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Detalle de grupo

- **Archivo:** `app/detalle-de-grupo.tsx`
- **Qué muestra:** Pestañas Participantes, Rondas y Resumen
- **Acciones:** Agregar participante, sortear turnos, iniciar pasanaku, compartir PDF
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04, HU-05, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Detalle de grupo            │
├──────────────────────────────┤
│ nombre                       │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay grupos. Tocá «Agregar participante» para empezar. |
| Con datos | Pestañas Participantes, Rondas y Resumen |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Formulario de participante

- **Archivo:** `app/formulario-de-participante.tsx`
- **Qué muestra:** Nombre, teléfono (con +591 por defecto), turno
- **Acciones:** Guardar, eliminar
- **Historias relacionadas:** HU-02 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| grupo id | Selector de grupos | Sí | Debe existir en `grupos` |
| nombre | Texto | Sí | Texto de 1 a 80 caracteres sin espacios sobrantes |
| telefono | Teléfono | No | Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) |
| turno | Numérico entero | No | Entero mayor o igual a 0 |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de participan    │
├──────────────────────────────┤
│ grupo id                     │
│ [____________________]       │
│ nombre                       │
│ [____________________]       │
│ telefono                     │
│ [____________________]       │
│ turno                        │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay participantes. Tocá «Guardar» para empezar. |
| Con datos | Nombre, teléfono (con +591 por defecto), turno |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Detalle de ronda

- **Archivo:** `app/detalle-de-ronda.tsx`
- **Qué muestra:** Beneficiario, pozo, fecha y lista de aportes con interruptor de pagado
- **Acciones:** Marcar aporte, cobrar por WhatsApp, cerrar ronda
- **Historias relacionadas:** HU-01, HU-03, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Detalle de ronda            │
├──────────────────────────────┤
│ fecha                        │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay rondas. Tocá «Marcar aporte» para empezar. |
| Con datos | Beneficiario, pozo, fecha y lista de aportes con interruptor de pagado |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Ajustes

- **Archivo:** `app/ajustes.tsx`
- **Qué muestra:** Texto del mensaje de cobro editable y activar recordatorios
- **Acciones:** Guardar plantilla
- **Historias relacionadas:** HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Ajustes                     │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Texto del mensaje de cobro editable y activar recordatorios |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Crear un grupo**

```
abro la app  →  veo un estado vacío con el botón «Crear grupo»
```

**HU-02 — Agregar participantes y asignar turnos**

```
toco «Sortear turnos»  →  cada uno recibe un turno distinto del 1 al 6
```

**HU-03 — Generar rondas y beneficiarios**

```
toco «Iniciar pasanaku»  →  se crean N rondas con beneficiario según turno y fechas según la frecuencia
```

**HU-04 — Registrar aportes y ver quién debe**

```
lo toco y confirmo  →  queda pagado con la fecha de hoy y el contador «pagaron X de Y» se actualiza
```

**HU-05 — Cobrar por WhatsApp y recibir recordatorios**

```
toco «Cobrar por WhatsApp»  →  se abre WhatsApp con su nombre, la ronda y el monto
```

**HU-06 — Compartir el resumen en PDF**

```
toco «Compartir resumen»  →  se genera un PDF con participantes, turnos, rondas y estado de aportes y se abre el menú de compartir
```
