type Celda = string | number | null | undefined;

/** Convierte filas a CSV escapando comillas, comas y saltos de línea. */
export function aCSV(columnas: string[], filas: Celda[][]): string {
  const escapar = (c: Celda) => {
    const texto = c == null ? '' : String(c);
    return /[",\n]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto;
  };
  return [columnas, ...filas].map((f) => f.map(escapar).join(',')).join('\n');
}
