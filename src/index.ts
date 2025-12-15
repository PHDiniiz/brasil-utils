/**
 * Módulo principal do pacote brasil-utils
 * Exporta funções de validação e busca de CEP
 */


// Exportar funções de validação
export {
  validarCPF,
  validarCNPJ,
  validarTelefone,
  validarCelular,
} from './validators/index.js';

// Exportar funções de CEP
export {
  validarCEP,
  buscarCEP,
  buscarCEPPorEndereco,
} from './cep/index.js';

// Exportar tipos de CEP
export type {
  ViaCEPResponse,
  ViaCEPSearchResponse,
} from './cep/index.js';

