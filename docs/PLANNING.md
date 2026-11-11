# Plan de desarrollo — PasanakuYa

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Grupos y participantes | 4 | 6 |
| 3 | Turnos y rondas | 4 | 10 |
| 4 | Aportes y deudores | 3 | 13 |
| 5 | Recordatorios y PDF | 4 | 17 |

Total: **17 días** (~4 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Grupos y participantes

**Estimación:** 4 días. **Rama sugerida:** `fase-2-grupos-y-participantes`.

**Objetivo:** Crear grupos y cargar a sus participantes.

**Historias que se completan:** HU-01 (Crear un grupo).

**Tareas**

- [ ] **F2-T1** Consultas de grupos y participantes (crear, listar, editar, borrar) con tipos TypeScript.
- [ ] **F2-T2** Pantalla Inicio con lista de grupos y estado vacío.
- [ ] **F2-T3** Formulario de grupo con validación de monto, frecuencia y fecha.
- [ ] **F2-T4** Pantalla Detalle de grupo con la pestaña Participantes.
- [ ] **F2-T5** Formulario de participante; normalizar el teléfono (+591).
- [ ] **F2-T6** Pruebas de validación de montos y teléfonos.
- [ ] **F2-T7** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T8** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T9** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — no tengo grupos → abro la app → veo un estado vacío con el botón «Crear grupo».
- [ ] HU-01 — el formulario de grupo está abierto → dejo el monto vacío o en 0 → no se guarda y aparece «El monto debe ser mayor a 0».

**Criterio de salida:**

- [ ] Puedo crear un grupo con 8 participantes y verlos tras reiniciar la app.
- [ ] Borrar un grupo pide confirmación y borra sus participantes (cascada).
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Turnos y rondas

**Estimación:** 4 días. **Rama sugerida:** `fase-3-turnos-y-rondas`.

**Objetivo:** Asignar turnos, generar rondas y fechas.

**Historias que se completan:** HU-02 (Agregar participantes y asignar turnos), HU-03 (Generar rondas y beneficiarios).

**Tareas**

- [ ] **F3-T1** Asignación manual de turnos con validación de unicidad.
- [ ] **F3-T2** Sorteo aleatorio (Fisher-Yates) bloqueado una vez iniciada la primera ronda.
- [ ] **F3-T3** Función pura que calcula las fechas de las rondas según frecuencia, con pruebas.
- [ ] **F3-T4** Acción «Iniciar pasanaku»: crea rondas y aportes pendientes en una sola transacción.
- [ ] **F3-T5** Pestaña Rondas con beneficiario, fecha y estado.
- [ ] **F3-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-02 — un grupo con 6 participantes sin turno → toco «Sortear turnos» → cada uno recibe un turno distinto del 1 al 6.
- [ ] HU-02 — la ronda 1 ya empezó → intento sortear de nuevo → la app lo bloquea y explica el motivo.
- [ ] HU-03 — un grupo con turnos asignados → toco «Iniciar pasanaku» → se crean N rondas con beneficiario según turno y fechas según la frecuencia.
- [ ] HU-03 — falta un aporte en la ronda → intento cerrarla → la app pide confirmación y deja la deuda marcada.

**Criterio de salida:**

- [ ] Un grupo de N participantes genera N rondas con fechas correctas.
- [ ] Las pruebas de fechas cubren semanal, quincenal, mensual y fin de mes.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Aportes y deudores

**Estimación:** 3 días. **Rama sugerida:** `fase-4-aportes-y-deudores`.

**Objetivo:** Registrar aportes y mostrar deudores.

**Historias que se completan:** HU-04 (Registrar aportes y ver quién debe).

**Tareas**

- [ ] **F4-T1** Pantalla Detalle de ronda con lista de aportes e interruptor pagado.
- [ ] **F4-T2** Marcar y desmarcar aportes guardando la fecha.
- [ ] **F4-T3** Contador «pagaron X de Y» y total recaudado de la ronda.
- [ ] **F4-T4** Cierre de ronda con confirmación si hay deudas.
- [ ] **F4-T5** Vista «Deudores» del grupo con el total adeudado por persona.
- [ ] **F4-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-04 — un aporte pendiente → lo toco y confirmo → queda pagado con la fecha de hoy y el contador «pagaron X de Y» se actualiza.
- [ ] HU-04 — un aporte marcado por error → lo desmarco → vuelve a pendiente y la fecha se borra.

**Criterio de salida:**

- [ ] Puedo registrar un aporte en 3 toques o menos.
- [ ] El total adeudado por persona coincide con una cuenta manual en las pruebas.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Recordatorios y PDF

**Estimación:** 4 días. **Rama sugerida:** `fase-5-recordatorios-y-pdf`.

**Objetivo:** Cobrar por WhatsApp, avisar y compartir PDF.

**Historias que se completan:** HU-05 (Cobrar por WhatsApp y recibir recordatorios), HU-06 (Compartir el resumen en PDF).

**Tareas**

- [ ] **F5-T1** Plantilla de mensaje de cobro editable con variables {nombre}, {ronda}, {monto}.
- [ ] **F5-T2** Enlace https://wa.me con número y texto codificado.
- [ ] **F5-T3** Notificación local 1 día antes de cada ronda (expo-notifications) con permiso pedido en contexto.
- [ ] **F5-T4** PDF del resumen con expo-print y menú de compartir con expo-sharing.
- [ ] **F5-T5** Pantalla Ajustes y pruebas de la plantilla de mensaje.
- [ ] **F5-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-05 — un deudor con teléfono → toco «Cobrar por WhatsApp» → se abre WhatsApp con su nombre, la ronda y el monto.
- [ ] HU-05 — un deudor sin teléfono → veo su fila → el botón está deshabilitado y sugiere cargar el teléfono.
- [ ] HU-05 — falta 1 día para una ronda → el recordatorio está activo → llega una notificación local con los datos de la ronda.
- [ ] HU-06 — un grupo con rondas → toco «Compartir resumen» → se genera un PDF con participantes, turnos, rondas y estado de aportes y se abre el menú de compartir.

**Criterio de salida:**

- [ ] El mensaje de cobro llega a WhatsApp con los datos correctos.
- [ ] El PDF abre bien en un teléfono real y se puede compartir.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Grupos y participantes

- **Día 3** (día 1 de la fase): `F2-T1` Consultas de grupos y participantes (crear, listar, editar, borrar) con tipos TypeScript.; `F2-T2` Pantalla Inicio con lista de grupos y estado vacío.; `F2-T3` Formulario de grupo con validación de monto, frecuencia y fecha..
- **Día 4** (día 2 de la fase): `F2-T4` Pantalla Detalle de grupo con la pestaña Participantes.; `F2-T5` Formulario de participante; normalizar el teléfono (+591).; `F2-T6` Pruebas de validación de montos y teléfonos..
- **Día 5** (día 3 de la fase): `F2-T7` Validaciones, estados vacíos y mensajes en español; `F2-T8` Pruebas automáticas y verificación manual de criterios; `F2-T9` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.
- **Día 6** (día 4 de la fase): colchón: terminar pendientes, probar en el teléfono y ajustar detalles.

### Fase 3 — Turnos y rondas

- **Día 7** (día 1 de la fase): `F3-T1` Asignación manual de turnos con validación de unicidad.; `F3-T2` Sorteo aleatorio (Fisher-Yates) bloqueado una vez iniciada la primera ronda..
- **Día 8** (día 2 de la fase): `F3-T3` Función pura que calcula las fechas de las rondas según frecuencia, con pruebas.; `F3-T4` Acción «Iniciar pasanaku»: crea rondas y aportes pendientes en una sola transacción..
- **Día 9** (día 3 de la fase): `F3-T5` Pestaña Rondas con beneficiario, fecha y estado.; `F3-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 10** (día 4 de la fase): `F3-T7` Pruebas automáticas y verificación manual de criterios; `F3-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 4 — Aportes y deudores

- **Día 11** (día 1 de la fase): `F4-T1` Pantalla Detalle de ronda con lista de aportes e interruptor pagado.; `F4-T2` Marcar y desmarcar aportes guardando la fecha.; `F4-T3` Contador «pagaron X de Y» y total recaudado de la ronda..
- **Día 12** (día 2 de la fase): `F4-T4` Cierre de ronda con confirmación si hay deudas.; `F4-T5` Vista «Deudores» del grupo con el total adeudado por persona.; `F4-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 13** (día 3 de la fase): `F4-T7` Pruebas automáticas y verificación manual de criterios; `F4-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Recordatorios y PDF

- **Día 14** (día 1 de la fase): `F5-T1` Plantilla de mensaje de cobro editable con variables {nombre}, {ronda}, {monto}.; `F5-T2` Enlace https://wa.me con número y texto codificado..
- **Día 15** (día 2 de la fase): `F5-T3` Notificación local 1 día antes de cada ronda (expo-notifications) con permiso pedido en contexto.; `F5-T4` PDF del resumen con expo-print y menú de compartir con expo-sharing..
- **Día 16** (día 3 de la fase): `F5-T5` Pantalla Ajustes y pruebas de la plantilla de mensaje.; `F5-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 17** (día 4 de la fase): `F5-T7` Pruebas automáticas y verificación manual de criterios; `F5-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
