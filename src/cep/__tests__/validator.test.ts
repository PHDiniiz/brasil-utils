import { describe, it, expect } from 'vitest';
import { validarCEP } from '../validator.js';

describe('validarCEP', () => {
  it('valida CEPs válidos', () => {
    expect(validarCEP('01001000')).toBe(true);
    expect(validarCEP('01001-000')).toBe(true);
    expect(validarCEP('12345678')).toBe(true);
    expect(validarCEP('98765432')).toBe(true);
    expect(validarCEP('00000000')).toBe(true);
  });
  it('rejeita CEPs inválidos', () => {
    expect(validarCEP('1234567')).toBe(false); // Menos de 8 dígitos
    expect(validarCEP('123456789')).toBe(false); // Mais de 8 dígitos
    expect(validarCEP('01001-00')).toBe(false); // Formato incompleto
    expect(validarCEP('')).toBe(false); // String vazia
    expect(validarCEP('abc-def-gh')).toBe(false); // Apenas letras
    expect(validarCEP('12345-67')).toBe(false); // Formato incorreto
    expect(validarCEP('123 456 78')).toBe(false); // Com espaços
  });
});



// ou adapte para seu framework de testes preferido (Jest, Vitest, etc.)

