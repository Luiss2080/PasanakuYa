# Especificación del MVP — PasanakuYa

## 1. Resumen

Gestión de pasanakus: participantes, turnos, aportes y quién debe, con recordatorios por WhatsApp.

**Usuario objetivo:** grupos de ahorro rotativo (pasanaku).

**Problema que resuelve:** hoy estas tareas se llevan en cuaderno o en el chat de WhatsApp, con errores y sin historial. PasanakuYa las ordena en una app simple que funciona sin internet.

**Propuesta de valor:** registrar en segundos, consultar al instante y compartir el resultado, sin cuentas, sin servidores y sin costo.

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
- Servidor, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago.

## 3. Historias de usuario y criterios de aceptación

### HU-01 — Grupos con monto de aporte, frecuencia y fecha de inicio

**Como** usuario (grupos de ahorro rotativo (pasanaku)), **quiero** grupos con monto de aporte, frecuencia y fecha de inicio, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-02 — Participantes con turno asignado o sorteado al azar

**Como** usuario (grupos de ahorro rotativo (pasanaku)), **quiero** participantes con turno asignado o sorteado al azar, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-03 — Registro de aportes por ronda: quién pagó y quién debe

**Como** usuario (grupos de ahorro rotativo (pasanaku)), **quiero** registro de aportes por ronda: quién pagó y quién debe, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-04 — Beneficiario de cada ronda y cierre de ronda

**Como** usuario (grupos de ahorro rotativo (pasanaku)), **quiero** beneficiario de cada ronda y cierre de ronda, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-05 — Recordatorios de cobro por WhatsApp y notificación local

**Como** usuario (grupos de ahorro rotativo (pasanaku)), **quiero** recordatorios de cobro por WhatsApp y notificación local, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-06 — Resumen del grupo en PDF para compartir

**Como** usuario (grupos de ahorro rotativo (pasanaku)), **quiero** resumen del grupo en PDF para compartir, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

## 4. Pantallas

| Pantalla | Propósito |
|---|---|
| Inicio | Resumen y accesos directos a lo más usado |
| Lista de grupos | Ver, buscar y abrir cada registro |
| Formulario de grupos | Crear y editar con validaciones |
| Lista de participantes | Ver, buscar y abrir cada registro |
| Formulario de participantes | Crear y editar con validaciones |
| Lista de rondas | Ver, buscar y abrir cada registro |
| Formulario de rondas | Crear y editar con validaciones |
| Lista de aportes | Ver, buscar y abrir cada registro |
| Formulario de aportes | Crear y editar con validaciones |
| Ajustes | Datos del usuario, moneda y exportación |

## 5. Modelo de datos

- **grupos**: id, nombre, monto_aporte, frecuencia, fecha_inicio
- **participantes**: id, grupo_id, nombre, telefono, turno
- **rondas**: id, grupo_id, numero, beneficiario_id, fecha
- **aportes**: id, ronda_id, participante_id, monto, fecha, pagado

El SQL completo y la política de migraciones están en [ARQUITECTURA.md](ARQUITECTURA.md).

## 6. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos y las listas responden de inmediato con cientos de registros.
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).

## 7. Riesgos y decisiones

| Riesgo | Mitigación |
|---|---|
| Perder el celular y los datos | Respaldo exportable (CSV o archivo de base) en la versión 1.1 |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| Alcance que crece | Todo lo que no esté en la sección 2 va a «Después del MVP» |

## 8. Criterios para lanzar el MVP

- [ ] Todas las historias de la sección 3 cumplen sus criterios.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk`.
- [ ] README con capturas y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado.
