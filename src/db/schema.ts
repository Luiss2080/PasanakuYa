// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE grupos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, monto_aporte REAL NOT NULL, frecuencia TEXT NOT NULL DEFAULT 'semanal', fecha_inicio TEXT NOT NULL);
CREATE TABLE participantes (id INTEGER PRIMARY KEY AUTOINCREMENT, grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE, nombre TEXT NOT NULL, telefono TEXT, turno INTEGER);
CREATE TABLE rondas (id INTEGER PRIMARY KEY AUTOINCREMENT, grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE, numero INTEGER NOT NULL, beneficiario_id INTEGER REFERENCES participantes(id), fecha TEXT NOT NULL);
CREATE TABLE aportes (id INTEGER PRIMARY KEY AUTOINCREMENT, ronda_id INTEGER NOT NULL REFERENCES rondas(id) ON DELETE CASCADE, participante_id INTEGER NOT NULL REFERENCES participantes(id) ON DELETE CASCADE, monto REAL NOT NULL, fecha TEXT, pagado INTEGER NOT NULL DEFAULT 0);`,
];

export const TABLAS = ['grupos', 'participantes', 'rondas', 'aportes'] as const;
