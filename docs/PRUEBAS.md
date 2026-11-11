# Plan de pruebas — PasanakuYa

> Qué probar, cuándo y cómo. Cada historia y cada regla de negocio tiene casos concretos. Complementa a [SPEC.md](SPEC.md).

## 1. Estrategia

| Nivel | Herramienta | Qué cubre | Cuándo |
|---|---|---|---|
| Unitarias | jest-expo (`npm test`) | Lógica pura de `src/lib/` (cálculos, validaciones, formatos) | En cada commit (CI) |
| Manuales por historia | Teléfono con Expo Go | Criterios de aceptación de SPEC (casos CP-) | Al cerrar cada tarea de pantalla |
| Regresión por fase | Teléfono real | Lo ya terminado sigue andando | Al cerrar cada fase |
| Aceptación final | APK en teléfono limpio, modo avión | Criterios de lanzamiento | Antes de v1.0.0 |

Meta de cobertura: **100 % de las reglas de negocio** con prueba automática o caso manual, y **100 % de los criterios de aceptación** ejecutados al menos una vez en un teléfono real.

## 2. Pruebas unitarias por regla de negocio

Crear un archivo `src/lib/<tema>.test.ts` por tema. Una prueba por regla como mínimo; agregar los bordes de la sección 4.

| ID | Regla | Tipo de prueba | Casos mínimos |
|---|---|---|---|
| RN-01 | Cada participante aporta el monto fijo del grupo en cada ronda, incluido el beneficiario. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-02 | Hay tantas rondas como participantes; la ronda N le paga al participante con turno N. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-03 | No puede haber dos participantes con el mismo turno dentro de un grupo. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-04 | El sorteo de turnos solo se permite antes de que empiece la primera ronda. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-05 | El pozo de una ronda es monto_aporte × cantidad de participantes. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-06 | La fecha de cada ronda se calcula desde fecha_inicio: semanal +7 días, quincenal +14, mensual +1 mes calendario. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-07 | Una ronda se cierra cuando todos aportaron, o cuando el organizador confirma cerrarla con deudas (quedan marcadas como pendientes). | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |

## 3. Casos manuales por historia

Formato: ejecutar en el teléfono, marcar ✔ o ✘ y anotar la fecha. Si falla, abrir un issue con el ID del caso.

### HU-01 — Crear un grupo (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-01-1 | no tengo grupos | abro la app | veo un estado vacío con el botón «Crear grupo» | ☐ |
| CP-01-2 | el formulario de grupo está abierto | dejo el monto vacío o en 0 | no se guarda y aparece «El monto debe ser mayor a 0» | ☐ |

Casos transversales: **CP-01-T1** modo avión · **CP-01-T2** cerrar y reabrir la app (persistencia) · **CP-01-T3** texto del sistema en tamaño grande.

### HU-02 — Agregar participantes y asignar turnos (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-02-1 | un grupo con 6 participantes sin turno | toco «Sortear turnos» | cada uno recibe un turno distinto del 1 al 6 | ☐ |
| CP-02-2 | la ronda 1 ya empezó | intento sortear de nuevo | la app lo bloquea y explica el motivo | ☐ |

Casos transversales: **CP-02-T1** modo avión · **CP-02-T2** cerrar y reabrir la app (persistencia) · **CP-02-T3** texto del sistema en tamaño grande.

### HU-03 — Generar rondas y beneficiarios (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-03-1 | un grupo con turnos asignados | toco «Iniciar pasanaku» | se crean N rondas con beneficiario según turno y fechas según la frecuencia | ☐ |
| CP-03-2 | falta un aporte en la ronda | intento cerrarla | la app pide confirmación y deja la deuda marcada | ☐ |

Casos transversales: **CP-03-T1** modo avión · **CP-03-T2** cerrar y reabrir la app (persistencia) · **CP-03-T3** texto del sistema en tamaño grande.

### HU-04 — Registrar aportes y ver quién debe (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-04-1 | un aporte pendiente | lo toco y confirmo | queda pagado con la fecha de hoy y el contador «pagaron X de Y» se actualiza | ☐ |
| CP-04-2 | un aporte marcado por error | lo desmarco | vuelve a pendiente y la fecha se borra | ☐ |

Casos transversales: **CP-04-T1** modo avión · **CP-04-T2** cerrar y reabrir la app (persistencia) · **CP-04-T3** texto del sistema en tamaño grande.

### HU-05 — Cobrar por WhatsApp y recibir recordatorios (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-05-1 | un deudor con teléfono | toco «Cobrar por WhatsApp» | se abre WhatsApp con su nombre, la ronda y el monto | ☐ |
| CP-05-2 | un deudor sin teléfono | veo su fila | el botón está deshabilitado y sugiere cargar el teléfono | ☐ |
| CP-05-3 | falta 1 día para una ronda | el recordatorio está activo | llega una notificación local con los datos de la ronda | ☐ |

Casos transversales: **CP-05-T1** modo avión · **CP-05-T2** cerrar y reabrir la app (persistencia) · **CP-05-T3** texto del sistema en tamaño grande.

### HU-06 — Compartir el resumen en PDF (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-06-1 | un grupo con rondas | toco «Compartir resumen» | se genera un PDF con participantes, turnos, rondas y estado de aportes y se abre el menú de compartir | ☐ |

Casos transversales: **CP-06-T1** modo avión · **CP-06-T2** cerrar y reabrir la app (persistencia) · **CP-06-T3** texto del sistema en tamaño grande.

## 4. Casos borde

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| CB-01 | Se elimina un participante a mitad de pasanaku: pedir confirmación, conservar sus aportes ya pagados y reasignar el turno. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-02 | Se cambia el monto con rondas ya cobradas: el cambio solo aplica a rondas futuras. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-03 | Teléfono guardado sin código de país: anteponer +591 al armar el enlace de WhatsApp. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-04 | Dos grupos con participantes repetidos: son registros independientes por grupo. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |

## 5. Pruebas de datos y migraciones

| ID | Prueba | Esperado |
|---|---|---|
| CD-01 | Primer arranque en teléfono limpio | La base se crea con todas las tablas y `user_version` queda en 1 |
| CD-02 | Actualizar de una versión anterior con datos cargados | Las migraciones nuevas se aplican y no se pierde ningún registro |
| CD-03 | Borrar un registro padre | Los hijos se borran o se bloquea con mensaje, según el esquema |
| CD-04 | Intentar guardar con campos obligatorios vacíos | No se inserta nada y se marcan los campos |
| CD-05 | Cargar 1.000 registros de prueba | Las listas siguen fluidas (scroll sin trabas) y abren en menos de 2 s |

## 6. Regresión al cerrar cada fase

**Fase 1 — Estructura base y navegación**

- [ ] La app abre y navega sin errores

**Fase 2 — Grupos y participantes**

- [ ] Puedo crear un grupo con 8 participantes y verlos tras reiniciar la app.
- [ ] Borrar un grupo pide confirmación y borra sus participantes (cascada).
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 3 — Turnos y rondas**

- [ ] Un grupo de N participantes genera N rondas con fechas correctas.
- [ ] Las pruebas de fechas cubren semanal, quincenal, mensual y fin de mes.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 4 — Aportes y deudores**

- [ ] Puedo registrar un aporte en 3 toques o menos.
- [ ] El total adeudado por persona coincide con una cuenta manual en las pruebas.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 5 — Recordatorios y PDF**

- [ ] El mensaje de cobro llega a WhatsApp con los datos correctos.
- [ ] El PDF abre bien en un teléfono real y se puede compartir.
- [ ] Los criterios de las fases anteriores siguen funcionando

## 7. Matriz de dispositivos

| Dispositivo | Android | Qué se verifica |
|---|---|---|
| Gama baja (2–3 GB de RAM) | 8–10 | Fluidez de listas, tiempo de arranque |
| Gama media | 11–13 | Flujo completo y APK |
| Pantalla pequeña (5") | cualquiera | Que nada quede cortado ni oculto por el teclado |
| Texto del sistema grande | cualquiera | Que los formularios sigan siendo usables |

## 8. Lista de verificación para el lanzamiento (v1.0.0)

- [ ] Todas las historias ejecutadas en teléfono real (casos CP-)
- [ ] Todos los casos borde (CB-) ejecutados
- [ ] Pruebas de datos (CD-) ejecutadas
- [ ] APK instalado en un teléfono limpio sin Expo Go
- [ ] Probado en modo avión durante todo el flujo principal
- [ ] Rotación de pantalla no pierde datos del formulario
- [ ] Permisos solicitados solo cuando se necesitan y con explicación
- [ ] Sin errores en la consola durante un recorrido completo
- [ ] README con capturas y CHANGELOG al día

## 9. Informe de errores

```
Título: [Bug] <qué pasó>
ID de caso: CP-XX-X
Pasos: 1... 2... 3...
Esperado: ...
Obtenido: ...
Dispositivo / Android: ...
Captura o video: ...
```
