/** Formatea un monto en bolivianos: 1234.5 -> "Bs 1.234,50". */
export function formatearMonto(valor: number): string {
  const negativo = valor < 0;
  const [entero, decimales] = Math.abs(valor).toFixed(2).split('.');
  const miles = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${negativo ? '-' : ''}Bs ${miles},${decimales}`;
}

/** Fecha local en formato AAAA-MM-DD (sin desfase de zona horaria). */
export function hoyISO(fecha: Date = new Date()): string {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}
