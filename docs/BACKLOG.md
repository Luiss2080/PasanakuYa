# Backlog de issues — PasanakuYa

> Lista lista para pasar a GitHub Issues, con milestones, etiquetas, estimaciones y trazabilidad a las historias. Se puede crear todo de una vez con [crear-issues.sh](crear-issues.sh).

## 1. Milestones

| Milestone | Fase | Días | Tareas | Horas est. |
|---|---|---|---|---|
| Fase 1 — Estructura base y navegación | 1 | 2 | 6 | 12 |
| Fase 2 — Grupos y participantes | 2 | 4 | 9 | 22.5 |
| Fase 3 — Turnos y rondas | 3 | 4 | 8 | 24 |
| Fase 4 — Aportes y deudores | 4 | 3 | 8 | 20 |
| Fase 5 — Recordatorios y PDF | 5 | 4 | 8 | 24 |

Total: **39 tareas**, ~103 horas (17 días a 6 horas efectivas).

## 2. Etiquetas

| Etiqueta | Uso |
|---|---|
| ui | Pantallas y componentes |
| datos | Tablas, consultas y migraciones |
| lógica | Reglas de negocio y cálculos |
| pruebas | Pruebas automáticas y manuales |
| integración | Cámara, notificaciones, PDF, compartir |
| tarea | Otras tareas |
| bug | Errores |
| mejora | Ideas para v1.1+ |

## 3. Issues del MVP

### Fase 1 — Estructura base y navegación

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F1-T1` | Instalar dependencias y abrir la app en Expo Go | — | tarea | Alta | 2 |
| `F1-T2` | Verificar creación y migración de la base | — | datos | Alta | 2 |
| `F1-T3` | Definir la navegación principal | — | ui | Alta | 2 |
| `F1-T4` | Aplicar tema y componente Pantalla | — | ui | Alta | 2 |
| `F1-T5` | Pantalla de inicio con accesos | — | ui | Alta | 2 |
| `F1-T6` | Confirmar CI en verde | — | tarea | Alta | 2 |

### Fase 2 — Grupos y participantes

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F2-T1` | Consultas de grupos y participantes (crear, listar, editar, borrar) con tipos TypeScript. | HU-01 | ui, datos | Alta | 2.5 |
| `F2-T2` | Pantalla Inicio con lista de grupos y estado vacío. | HU-01 | ui | Alta | 2.5 |
| `F2-T3` | Formulario de grupo con validación de monto, frecuencia y fecha. | HU-01 | ui, lógica | Alta | 2.5 |
| `F2-T4` | Pantalla Detalle de grupo con la pestaña Participantes. | HU-01 | ui | Alta | 2.5 |
| `F2-T5` | Formulario de participante; normalizar el teléfono (+591). | HU-01 | ui | Alta | 2.5 |
| `F2-T6` | Pruebas de validación de montos y teléfonos. | HU-01 | lógica, pruebas | Alta | 2.5 |
| `F2-T7` | Validaciones, estados vacíos y mensajes en español | HU-01 | lógica | Alta | 2.5 |
| `F2-T8` | Pruebas automáticas y verificación manual de criterios | HU-01 | pruebas | Alta | 2.5 |
| `F2-T9` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-01 | pruebas | Alta | 2.5 |

### Fase 3 — Turnos y rondas

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F3-T1` | Asignación manual de turnos con validación de unicidad. | HU-02, HU-03 | lógica | Alta | 3 |
| `F3-T2` | Sorteo aleatorio (Fisher-Yates) bloqueado una vez iniciada la primera ronda. | HU-02, HU-03 | tarea | Alta | 3 |
| `F3-T3` | Función pura que calcula las fechas de las rondas según frecuencia, con pruebas. | HU-02, HU-03 | lógica, pruebas | Alta | 3 |
| `F3-T4` | Acción «Iniciar pasanaku»: crea rondas y aportes pendientes en una sola transacción. | HU-02, HU-03 | tarea | Alta | 3 |
| `F3-T5` | Pestaña Rondas con beneficiario, fecha y estado. | HU-02, HU-03 | tarea | Alta | 3 |
| `F3-T6` | Validaciones, estados vacíos y mensajes en español | HU-02, HU-03 | lógica | Alta | 3 |
| `F3-T7` | Pruebas automáticas y verificación manual de criterios | HU-02, HU-03 | pruebas | Alta | 3 |
| `F3-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-02, HU-03 | pruebas | Alta | 3 |

### Fase 4 — Aportes y deudores

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F4-T1` | Pantalla Detalle de ronda con lista de aportes e interruptor pagado. | HU-04 | ui | Media | 2.5 |
| `F4-T2` | Marcar y desmarcar aportes guardando la fecha. | HU-04 | tarea | Media | 2.5 |
| `F4-T3` | Contador «pagaron X de Y» y total recaudado de la ronda. | HU-04 | tarea | Media | 2.5 |
| `F4-T4` | Cierre de ronda con confirmación si hay deudas. | HU-04 | tarea | Media | 2.5 |
| `F4-T5` | Vista «Deudores» del grupo con el total adeudado por persona. | HU-04 | ui | Media | 2.5 |
| `F4-T6` | Validaciones, estados vacíos y mensajes en español | HU-04 | lógica | Media | 2.5 |
| `F4-T7` | Pruebas automáticas y verificación manual de criterios | HU-04 | pruebas | Media | 2.5 |
| `F4-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-04 | pruebas | Media | 2.5 |

### Fase 5 — Recordatorios y PDF

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F5-T1` | Plantilla de mensaje de cobro editable con variables {nombre}, {ronda}, {monto}. | HU-05, HU-06 | tarea | Media | 3 |
| `F5-T2` | Enlace https://wa.me con número y texto codificado. | HU-05, HU-06 | tarea | Media | 3 |
| `F5-T3` | Notificación local 1 día antes de cada ronda (expo-notifications) con permiso pedido en contexto. | HU-05, HU-06 | integración | Media | 3 |
| `F5-T4` | PDF del resumen con expo-print y menú de compartir con expo-sharing. | HU-05, HU-06 | integración | Media | 3 |
| `F5-T5` | Pantalla Ajustes y pruebas de la plantilla de mensaje. | HU-05, HU-06 | ui, pruebas | Media | 3 |
| `F5-T6` | Validaciones, estados vacíos y mensajes en español | HU-05, HU-06 | lógica | Media | 3 |
| `F5-T7` | Pruebas automáticas y verificación manual de criterios | HU-05, HU-06 | pruebas | Media | 3 |
| `F5-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-05, HU-06 | pruebas | Media | 3 |

## 4. Orden recomendado de ataque

1. Terminá cada fase completa antes de abrir la siguiente; dentro de la fase, de arriba hacia abajo.
2. Las tareas `lógica` y `datos` van antes que las `ui` que las usan.
3. Cada issue se cierra con un commit o PR que lo mencione (`Cierra #N`).
4. Nada de abrir issues de v1.1 hasta tener el APK de la v1.0.0.

## 5. Ideas para después del MVP

| Idea | Esfuerzo | Valor |
|---|---|---|
| Modo oscuro | Bajo | Medio |
| Búsqueda y filtros avanzados | Medio | Alto |
| Estadísticas y gráficos simples en inicio | Medio | Medio |
| Respaldo y restauración de la base | Medio | Alto |
| Publicación en Google Play | Bajo | Alto |
| Sincronización opcional entre dispositivos | Alto | Depende de demanda |
