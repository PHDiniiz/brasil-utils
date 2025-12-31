import { describe, it, expect } from 'vitest';
import { validarTelefone, validarCelular } from '../phone.js';

describe('validarTelefone', () => {
  it('valida telefones fixos válidos', () => {
    expect(validarTelefone('(11) 3456-7890')).toBe(true);
    expect(validarTelefone('1134567890')).toBe(true);
    expect(validarTelefone('(21) 2234-5678')).toBe(true);
    expect(validarTelefone('2122345678')).toBe(true);
    expect(validarTelefone('(47) 3333-4444')).toBe(true);
    expect(validarTelefone('4733334444')).toBe(true);
    expect(validarTelefone('(85) 9876-5432')).toBe(true);
    expect(validarTelefone('8598765432')).toBe(true);
  });
  it('rejeita telefones fixos inválidos', () => {
    expect(validarTelefone('(11) 91234-5678')).toBe(false); // Celular (começa com 9)
    expect(validarTelefone('11912345678')).toBe(false);
    expect(validarTelefone('(10) 3456-7890')).toBe(false); // DDD inválido
    expect(validarTelefone('1034567890')).toBe(false);
    expect(validarTelefone('(11) 1234-5678')).toBe(false); // Começa com 1 (inválido)
    expect(validarTelefone('1112345678')).toBe(false);
    expect(validarTelefone('(11) 3456-789')).toBe(false); // Menos de 10 dígitos
    expect(validarTelefone('113456789')).toBe(false);
    expect(validarTelefone('')).toBe(false); // String vazia
    expect(validarTelefone('abc-def-ghij')).toBe(false); // Apenas letras
  });
});

describe('validarCelular', () => {
  it('valida celulares válidos', () => {
    expect(validarCelular('(11) 91234-5678')).toBe(true);
    expect(validarCelular('11912345678')).toBe(true);
    expect(validarCelular('(21) 98765-4321')).toBe(true);
    expect(validarCelular('21987654321')).toBe(true);
  });
  it('rejeita celulares inválidos', () => {
    expect(validarCelular('(11) 3456-7890')).toBe(false); // Telefone fixo
    expect(validarCelular('1134567890')).toBe(false);
    expect(validarCelular('(10) 91234-5678')).toBe(false); // DDD inválido
    expect(validarCelular('10912345678')).toBe(false);
    expect(validarCelular('(11) 81234-5678')).toBe(false); // Não começa com 9
    expect(validarCelular('11812345678')).toBe(false);
    expect(validarCelular('(11) 91234-567')).toBe(false); // Menos de 11 dígitos
    expect(validarCelular('1191234567')).toBe(false);
    expect(validarCelular('')).toBe(false); // String vazia
    expect(validarCelular('abc-def-ghij')).toBe(false); // Apenas letras
  });
});

// Para executar os testes, importe e chame runPhoneTests() e runCellphoneTests()
// ou adapte para seu framework de testes preferido (Jest, Vitest, etc.)

