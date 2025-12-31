// ou adapte para seu framework de testes preferido (Jest, Vitest, etc.)
import { describe, it, expect } from 'vitest';
import { validarCNPJ } from '../cnpj.js';

describe('validarCNPJ', () => {
  it('valida CNPJs válidos', () => {
    expect(validarCNPJ('11.222.333/0001-81')).toBe(true);
    expect(validarCNPJ('11222333000181')).toBe(true);
    expect(validarCNPJ('00.000.000/0001-91')).toBe(true);
    expect(validarCNPJ('00000000000191')).toBe(true);
    expect(validarCNPJ('12.345.678/0001-95')).toBe(true);
    expect(validarCNPJ('12345678000195')).toBe(true);
  });
  it('rejeita CNPJs inválidos', () => {
    expect(validarCNPJ('11.111.111/1111-11')).toBe(false); // Sequência repetida
    expect(validarCNPJ('22.222.222/2222-22')).toBe(false); // Sequência repetida
    expect(validarCNPJ('11.222.333/0001-00')).toBe(false); // Dígitos verificadores incorretos
    expect(validarCNPJ('11222333000100')).toBe(false);
    expect(validarCNPJ('11.222.333/0001')).toBe(false); // Formato incompleto
    expect(validarCNPJ('112223330001')).toBe(false); // Menos de 14 dígitos
    expect(validarCNPJ('11.222.333/0001-811')).toBe(false); // Mais de 14 dígitos
    expect(validarCNPJ('112223330001811')).toBe(false);
    expect(validarCNPJ('')).toBe(false); // String vazia
    expect(validarCNPJ('ab.cde.fgh/ijkl-mn')).toBe(false); // Apenas letras
    expect(validarCNPJ('00.000.000/0000-00')).toBe(false); // Sequência de zeros
  });
});

