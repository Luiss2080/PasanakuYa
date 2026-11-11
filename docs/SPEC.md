# Especificación del MVP — PasanakuYa

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que el organizador sepa en 10 segundos quién pagó, quién debe y a quién le toca cobrar.

**Problema:** El organizador lleva el pasanaku en un cuaderno o en el chat de WhatsApp: se pierden aportes, hay discusiones sobre quién pagó y cobrar a los atrasados es incómodo.

**Cómo se resuelve hoy:** Cuaderno, notas del celular y mensajes sueltos.

**Usuario objetivo:** Organizador/a de un pasanaku de 5 a 20 personas (familia, trabajo, barrio) que cobra por semana, quincena o mes y quiere transparencia con el grupo.

**Métricas de éxito del MVP:**

- Registrar el aporte de una persona en 3 toques o menos.
- Ver en una sola pantalla quién debe en la ronda actual.
- Compartir el resumen del grupo por WhatsApp en menos de 10 segundos.

## 2. Alcance del MVP

### Incluido

- Grupos con monto de aporte, frecuencia y fecha de inicio.
- Participantes con turno asignado o sorteado al azar.
- Registro de aportes por ronda: quién pagó y quién debe.
- Beneficiario de cada ronda y cierre de ronda.
- Recordatorios de cobro por WhatsApp y notificación local.
- Resumen del grupo en PDF para compartir.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** Cada participante aporta el monto fijo del grupo en cada ronda, incluido el beneficiario.
- **RN-02** Hay tantas rondas como participantes; la ronda N le paga al participante con turno N.
- **RN-03** No puede haber dos participantes con el mismo turno dentro de un grupo.
- **RN-04** El sorteo de turnos solo se permite antes de que empiece la primera ronda.
- **RN-05** El pozo de una ronda es monto_aporte × cantidad de participantes.
- **RN-06** La fecha de cada ronda se calcula desde fecha_inicio: semanal +7 días, quincenal +14, mensual +1 mes calendario.
- **RN-07** Una ronda se cierra cuando todos aportaron, o cuando el organizador confirma cerrarla con deudas (quedan marcadas como pendientes).

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Crear un grupo

**Como** organizador **quiero** crear un grupo con monto, frecuencia y fecha de inicio **para** armar mi pasanaku en un minuto.

**Fase:** 2 — Grupos y participantes

**Criterios de aceptación:**

1. **Dado:** no tengo grupos. **Cuando:** abro la app. **Entonces:** veo un estado vacío con el botón «Crear grupo».
2. **Dado:** el formulario de grupo está abierto. **Cuando:** dejo el monto vacío o en 0. **Entonces:** no se guarda y aparece «El monto debe ser mayor a 0».

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Agregar participantes y asignar turnos

**Como** organizador **quiero** agregar participantes y asignarles turno a mano o por sorteo **para** que todos sepan cuándo cobran.

**Fase:** 3 — Turnos y rondas

**Criterios de aceptación:**

1. **Dado:** un grupo con 6 participantes sin turno. **Cuando:** toco «Sortear turnos». **Entonces:** cada uno recibe un turno distinto del 1 al 6.
2. **Dado:** la ronda 1 ya empezó. **Cuando:** intento sortear de nuevo. **Entonces:** la app lo bloquea y explica el motivo.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Generar rondas y beneficiarios

**Como** organizador **quiero** que la app genere las rondas con su beneficiario y fecha **para** no calcular fechas a mano.

**Fase:** 3 — Turnos y rondas

**Criterios de aceptación:**

1. **Dado:** un grupo con turnos asignados. **Cuando:** toco «Iniciar pasanaku». **Entonces:** se crean N rondas con beneficiario según turno y fechas según la frecuencia.
2. **Dado:** falta un aporte en la ronda. **Cuando:** intento cerrarla. **Entonces:** la app pide confirmación y deja la deuda marcada.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Registrar aportes y ver quién debe

**Como** organizador **quiero** marcar quién pagó en cada ronda **para** saber al instante quién debe.

**Fase:** 4 — Aportes y deudores

**Criterios de aceptación:**

1. **Dado:** un aporte pendiente. **Cuando:** lo toco y confirmo. **Entonces:** queda pagado con la fecha de hoy y el contador «pagaron X de Y» se actualiza.
2. **Dado:** un aporte marcado por error. **Cuando:** lo desmarco. **Entonces:** vuelve a pendiente y la fecha se borra.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Cobrar por WhatsApp y recibir recordatorios

**Como** organizador **quiero** enviar un cobro prellenado por WhatsApp y recibir un aviso antes de cada ronda **para** cobrar sin incomodar y sin olvidarme.

**Fase:** 5 — Recordatorios y PDF

**Criterios de aceptación:**

1. **Dado:** un deudor con teléfono. **Cuando:** toco «Cobrar por WhatsApp». **Entonces:** se abre WhatsApp con su nombre, la ronda y el monto.
2. **Dado:** un deudor sin teléfono. **Cuando:** veo su fila. **Entonces:** el botón está deshabilitado y sugiere cargar el teléfono.
3. **Dado:** falta 1 día para una ronda. **Cuando:** el recordatorio está activo. **Entonces:** llega una notificación local con los datos de la ronda.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-06 — Compartir el resumen en PDF

**Como** organizador **quiero** generar un PDF del grupo **para** mostrar transparencia a todos los participantes.

**Fase:** 5 — Recordatorios y PDF

**Criterios de aceptación:**

1. **Dado:** un grupo con rondas. **Cuando:** toco «Compartir resumen». **Entonces:** se genera un PDF con participantes, turnos, rondas y estado de aportes y se abre el menú de compartir.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Lista de grupos con la ronda actual (X de N), el pozo y la cantidad de deudores | Crear grupo, abrir grupo |
| Formulario de grupo | Nombre, monto de aporte, frecuencia, fecha de inicio | Guardar, cancelar |
| Detalle de grupo | Pestañas Participantes, Rondas y Resumen | Agregar participante, sortear turnos, iniciar pasanaku, compartir PDF |
| Formulario de participante | Nombre, teléfono (con +591 por defecto), turno | Guardar, eliminar |
| Detalle de ronda | Beneficiario, pozo, fecha y lista de aportes con interruptor de pagado | Marcar aporte, cobrar por WhatsApp, cerrar ronda |
| Ajustes | Texto del mensaje de cobro editable y activar recordatorios | Guardar plantilla |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `grupos`

Cada pasanaku: monto fijo, frecuencia y fecha de inicio.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `monto_aporte` | REAL | Obligatorio |
| `frecuencia` | TEXT | Obligatorio; Por defecto “semanal” |
| `fecha_inicio` | TEXT | Obligatorio |

### `participantes`

Integrantes del grupo con su turno de cobro.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `grupo_id` | INTEGER | Obligatorio; Referencia a grupos (se borra en cascada) |
| `nombre` | TEXT | Obligatorio |
| `telefono` | TEXT | Opcional |
| `turno` | INTEGER | Opcional |

### `rondas`

Una ronda por turno; guarda el beneficiario y la fecha.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `grupo_id` | INTEGER | Obligatorio; Referencia a grupos (se borra en cascada) |
| `numero` | INTEGER | Obligatorio |
| `beneficiario_id` | INTEGER | Referencia a participantes |
| `fecha` | TEXT | Obligatorio |

### `aportes`

Lo que cada participante debe aportar en cada ronda.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `ronda_id` | INTEGER | Obligatorio; Referencia a rondas (se borra en cascada) |
| `participante_id` | INTEGER | Obligatorio; Referencia a participantes (se borra en cascada) |
| `monto` | REAL | Obligatorio |
| `fecha` | TEXT | Opcional |
| `pagado` | INTEGER | Obligatorio; Por defecto 0 |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Se elimina un participante a mitad de pasanaku: pedir confirmación, conservar sus aportes ya pagados y reasignar el turno.
- Se cambia el monto con rondas ya cobradas: el cambio solo aplica a rondas futuras.
- Teléfono guardado sin código de país: anteponer +591 al armar el enlace de WhatsApp.
- Dos grupos con participantes repetidos: son registros independientes por grupo.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-notifications` | Recordatorios locales (programados en el teléfono, sin servidor) | Notificaciones |
| `expo-print` | Generar PDF desde HTML | — |
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| El organizador pierde el celular | Respaldo exportable en v1.1; mientras tanto, PDF del resumen compartido con el grupo. |
| Disputas por «yo sí pagué» | Cada aporte guarda fecha; el PDF funciona como constancia. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en PasanakuYa |
|---|---|
| `grupos` | Cada pasanaku: monto fijo, frecuencia y fecha de inicio. |
| `participantes` | Integrantes del grupo con su turno de cobro. |
| `rondas` | Una ronda por turno; guarda el beneficiario y la fecha. |
| `aportes` | Lo que cada participante debe aportar en cada ronda. |
| `grupos.frecuencia` | Valores: semanal, quincenal, mensual |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Crear un grupo | 2 | CP-01-1, CP-01-2 |
| HU-02 Agregar participantes y asignar turnos | 3 | CP-02-1, CP-02-2 |
| HU-03 Generar rondas y beneficiarios | 3 | CP-03-1, CP-03-2 |
| HU-04 Registrar aportes y ver quién debe | 4 | CP-04-1, CP-04-2 |
| HU-05 Cobrar por WhatsApp y recibir recordatorios | 5 | CP-05-1, CP-05-2, CP-05-3 |
| HU-06 Compartir el resumen en PDF | 5 | CP-06-1 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
