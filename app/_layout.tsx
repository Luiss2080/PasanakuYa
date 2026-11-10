import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';

import { DB_NAME, migrarBaseDeDatos } from '../src/db';
import { NOMBRE, colores } from '../src/theme';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DB_NAME} onInit={migrarBaseDeDatos}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          title: NOMBRE,
          headerStyle: { backgroundColor: colores.primario },
          headerTintColor: colores.blanco,
        }}
      />
    </SQLiteProvider>
  );
}
