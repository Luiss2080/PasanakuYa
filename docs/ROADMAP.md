# Roadmap de PasanakuYa

> Que el organizador sepa en 10 segundos quién pagó, quién debe y a quién le toca cobrar.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Gestión de pasanakus: participantes, turnos, aportes y quién debe, con recordatorios por WhatsApp.
- **Usuario:** Organizador/a de un pasanaku de 5 a 20 personas (familia, trabajo, barrio) que cobra por semana, quincena o mes y quiere transparencia con el grupo.
- **Duración estimada:** ~17 días de trabajo efectivo (~4 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Grupos y participantes | Crear grupos y cargar a sus participantes. | 4 | 2 |
| 3 | Turnos y rondas | Asignar turnos, generar rondas y fechas. | 4 | 2 |
| 4 | Aportes y deudores | Registrar aportes y mostrar deudores. | 3 | 3 |
| 5 | Recordatorios y PDF | Cobrar por WhatsApp, avisar y compartir PDF. | 4 | 4 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Grupos y participantes

**Demo:** Puedo crear un grupo con 8 participantes y verlos tras reiniciar la app. Borrar un grupo pide confirmación y borra sus participantes (cascada).

### Hito 3 — Turnos y rondas

**Demo:** Un grupo de N participantes genera N rondas con fechas correctas. Las pruebas de fechas cubren semanal, quincenal, mensual y fin de mes.

### Hito 4 — Aportes y deudores

**Demo:** Puedo registrar un aporte en 3 toques o menos. El total adeudado por persona coincide con una cuenta manual en las pruebas.

### Hito 5 — Recordatorios y PDF

**Demo:** El mensaje de cobro llega a WhatsApp con los datos correctos. El PDF abre bien en un teléfono real y se puede compartir.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Grupos y participantes

- **Objetivo:** Crear grupos y cargar a sus participantes.
- **Historias cubiertas:** HU-01 Crear un grupo
- **Depende de:** fase 1.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Puedo crear un grupo con 8 participantes y verlos tras reiniciar la app.
  - Borrar un grupo pide confirmación y borra sus participantes (cascada).

### Fase 3 — Turnos y rondas

- **Objetivo:** Asignar turnos, generar rondas y fechas.
- **Historias cubiertas:** HU-02 Agregar participantes y asignar turnos; HU-03 Generar rondas y beneficiarios
- **Depende de:** fase 2.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Un grupo de N participantes genera N rondas con fechas correctas.
  - Las pruebas de fechas cubren semanal, quincenal, mensual y fin de mes.

### Fase 4 — Aportes y deudores

- **Objetivo:** Registrar aportes y mostrar deudores.
- **Historias cubiertas:** HU-04 Registrar aportes y ver quién debe
- **Depende de:** fase 3.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Puedo registrar un aporte en 3 toques o menos.
  - El total adeudado por persona coincide con una cuenta manual en las pruebas.

### Fase 5 — Recordatorios y PDF

- **Objetivo:** Cobrar por WhatsApp, avisar y compartir PDF.
- **Historias cubiertas:** HU-05 Cobrar por WhatsApp y recibir recordatorios; HU-06 Compartir el resumen en PDF
- **Depende de:** fase 4.
- **Duración:** 4 días.
- **Criterio de salida:**
  - El mensaje de cobro llega a WhatsApp con los datos correctos.
  - El PDF abre bien en un teléfono real y se puede compartir.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Grupos y participantes
- [ ] **Fase 3:** Turnos y rondas
- [ ] **Fase 4:** Aportes y deudores
- [ ] **Fase 5:** Recordatorios y PDF

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Crear un grupo | 2 | Grupos y participantes |
| HU-02 Agregar participantes y asignar turnos | 3 | Turnos y rondas |
| HU-03 Generar rondas y beneficiarios | 3 | Turnos y rondas |
| HU-04 Registrar aportes y ver quién debe | 4 | Aportes y deudores |
| HU-05 Cobrar por WhatsApp y recibir recordatorios | 5 | Recordatorios y PDF |
| HU-06 Compartir el resumen en PDF | 5 | Recordatorios y PDF |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 39 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 12 | 100 % |
| Reglas cubiertas | RN con prueba / 7 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
