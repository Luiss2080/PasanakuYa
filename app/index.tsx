import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Pantalla } from '../src/components/Pantalla';
import { TABLAS } from '../src/db/schema';
import { NOMBRE, colores } from '../src/theme';

export default function Inicio() {
  const db = useSQLiteContext();
  const [conteos, setConteos] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const resultado: Record<string, number> = {};
      for (const tabla of TABLAS) {
        const fila = await db.getFirstAsync<{ n: number }>(`SELECT COUNT(*) AS n FROM ${tabla}`);
        resultado[tabla] = fila?.n ?? 0;
      }
      setConteos(resultado);
    })();
  }, [db]);

  return (
    <Pantalla>
      <Text style={estilos.titulo}>{NOMBRE}</Text>
      <Text style={estilos.subtitulo}>Base local lista. Estos son los registros por tabla:</Text>
      {TABLAS.map((tabla) => (
        <View key={tabla} style={estilos.fila}>
          <Text style={estilos.tabla}>{tabla}</Text>
          <Text style={estilos.cantidad}>{conteos[tabla] ?? 0}</Text>
        </View>
      ))}
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  titulo: { fontSize: 24, fontWeight: '700', color: colores.texto },
  subtitulo: { color: colores.textoSuave },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colores.blanco,
    borderColor: colores.borde,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  tabla: { color: colores.texto, fontWeight: '600' },
  cantidad: { color: colores.secundario, fontWeight: '700' },
});
