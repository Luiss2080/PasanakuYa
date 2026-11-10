import { aCSV } from '../csv';

describe('aCSV', () => {
  it('genera encabezado y filas', () => {
    expect(aCSV(['a', 'b'], [[1, 'x']])).toBe('a,b\n1,x');
  });

  it('escapa comas y comillas', () => {
    expect(aCSV(['t'], [['hola, "mundo"']])).toBe('t\n"hola, ""mundo"""');
  });
});
