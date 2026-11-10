# Roadmap de PasanakuYa

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que ya se puede usar y probar en el teléfono. Marcá con `[x]` cuando la fase cumpla su criterio de cierre.

| Fase | Nombre | Entregable | Estimación |
|---|---|---|---|
| 1 | Estructura base y navegación | App abre, navega y la base SQLite se crea sola | 2 días |
| 2 | Grupos y participantes | Grupos con monto de aporte, frecuencia y fecha de inicio; Participantes con turno asignado o sorteado al azar | 4 días |
| 3 | Turnos y rondas | Beneficiario de cada ronda y cierre de ronda | 4 días |
| 4 | Aportes y deudores | Registro de aportes por ronda: quién pagó y quién debe | 3 días |
| 5 | Recordatorios y PDF | Recordatorios de cobro por WhatsApp y notificación local; Resumen del grupo en PDF para compartir | 3 días |

Estimación total del MVP: **~16 días de trabajo** (a tu ritmo, sin apuro).

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Grupos y participantes
- [ ] **Fase 3:** Turnos y rondas
- [ ] **Fase 4:** Aportes y deudores
- [ ] **Fase 5:** Recordatorios y PDF

## Después del MVP (versión 1.1 en adelante)

- [ ] Respaldo y restauración: exportar e importar el archivo de la base de datos.
- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, única vez).
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo se usa este documento

1. Trabajá una fase a la vez, en el orden indicado.
2. El detalle de tareas de cada fase está en [PLANNING.md](PLANNING.md).
3. Qué debe hacer exactamente la app está en [SPEC.md](SPEC.md).
4. Al cerrar una fase, actualizá este archivo y el [CHANGELOG](../CHANGELOG.md).
