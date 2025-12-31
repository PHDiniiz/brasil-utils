import { describe, it, expect } from 'vitest';
import { buscarCEP, buscarCEPPorEndereco } from '../../libs/viacep.js';

describe('buscarCEP (ViaCEP)', () => {
  it.skip('busca CEP válido (real API)', async () => {
    const result = await buscarCEP('01001000');
    expect(result).toBeTruthy();
    expect(result?.cep).toBe('01001-000');
    expect(result?.logradouro).toBeTypeOf('string');
  });
  it.skip('retorna null para CEP inexistente (real API)', async () => {
    const result = await buscarCEP('99999999');
    expect(result).toBeNull();
  });
  it('retorna null para CEP com formato inválido', async () => {
    const result = await buscarCEP('12345');
    expect(result).toBeNull();
  });
});

describe('buscarCEPPorEndereco (ViaCEP)', () => {
  it.skip('busca por endereço válido (real API)', async () => {
    const results = await buscarCEPPorEndereco('SP', 'São Paulo', 'Praça da Sé');
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('cep');
  });
  it('retorna array vazio para parâmetros inválidos', async () => {
    const results = await buscarCEPPorEndereco('S', 'SP', 'Pa');
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
  });
});

// Fim dos testes Vitest
