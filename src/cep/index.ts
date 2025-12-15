/**
 * Módulo de CEP
 * Exporta funções para validação e busca de CEP utilizando a API ViaCEP
 */

export { validarCEP } from './validator.js';
export { buscarCEP, buscarCEPPorEndereco } from './viacep.js';
export type { ViaCEPResponse, ViaCEPSearchResponse } from './types.js';

