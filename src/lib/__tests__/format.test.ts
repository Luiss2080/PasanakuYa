import { formatearMonto, hoyISO } from '../format';

describe('formatearMonto', () => {
  it('usa punto para miles y coma para decimales', () => {
    expect(formatearMonto(1234.5)).toBe('Bs 1.234,50');
  });

  it('maneja cero y negativos', () => {
    expect(formatearMonto(0)).toBe('Bs 0,00');
    expect(formatearMonto(-15)).toBe('-Bs 15,00');
  });
});

describe('hoyISO', () => {
  it('devuelve AAAA-MM-DD', () => {
    expect(hoyISO(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
