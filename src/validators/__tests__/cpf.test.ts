import { describe, it, expect } from 'vitest';
import { validarCPF } from '../cpf.js';

describe('validarCPF', () => {
  it('valida CPFs válidos', () => {
    expect(validarCPF('111.444.777-35')).toBe(true);
    expect(validarCPF('11144477735')).toBe(true);
    expect(validarCPF('000.000.001-91')).toBe(true);
    expect(validarCPF('00000000191')).toBe(true);
  });
  it('rejeita CPFs inválidos', () => {
    expect(validarCPF('111.111.111-11')).toBe(false); // Sequência repetida
    expect(validarCPF('222.222.222-22')).toBe(false); // Sequência repetida
    expect(validarCPF('123.456.789-09')).toBe(false); // Dígitos verificadores incorretos
    expect(validarCPF('12345678909')).toBe(false);
    expect(validarCPF('123.456.789')).toBe(false); // Formato incompleto
    expect(validarCPF('123456789')).toBe(false); // Menos de 11 dígitos
    expect(validarCPF('123.456.789-091')).toBe(false); // Mais de 11 dígitos
    expect(validarCPF('123456789091')).toBe(false);
    expect(validarCPF('')).toBe(false); // String vazia
    expect(validarCPF('abc.def.ghi-jk')).toBe(false); // Apenas letras
    expect(validarCPF('000.000.000-00')).toBe(false); // Sequência de zeros
  });
});

