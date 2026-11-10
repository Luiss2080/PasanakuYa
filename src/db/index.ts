import type { SQLiteDatabase } from 'expo-sqlite';

import { MIGRACIONES } from './schema';

export const DB_NAME = 'pasanakuya.db';

/** Crea o actualiza la base local según el número de versión guardado en el archivo. */
export async function migrarBaseDeDatos(db: SQLiteDatabase): Promise<void> {
  await db.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  const fila = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const actual = fila?.user_version ?? 0;

  for (let i = actual; i < MIGRACIONES.length; i++) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(MIGRACIONES[i]);
      await db.execAsync(`PRAGMA user_version = ${i + 1}`);
    });
  }
}
