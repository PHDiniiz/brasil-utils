/**
 * Tipos TypeScript para respostas da API ViaCEP.
 * Baseado na documentação oficial: https://viacep.com.br/
 */

/**
 * Interface que representa a resposta completa da API ViaCEP para busca por CEP.
 * 
 * Contém todas as informações do endereço correspondente ao CEP consultado.
 * Todos os campos retornados pela API ViaCEP estão disponíveis nesta interface.
 * 
 * @interface ViaCEPResponse
 * @property {string} cep - CEP formatado (ex: "01001-000")
 * @property {string} logradouro - Nome da rua, avenida, praça, etc.
 * @property {string} complemento - Complemento do endereço (lado par/ímpar, etc.)
 * @property {string} unidade - Unidade do endereço (geralmente vazio)
 * @property {string} bairro - Nome do bairro
 * @property {string} localidade - Nome da cidade
 * @property {string} uf - Sigla do estado (2 caracteres, ex: "SP", "RJ")
 * @property {string} estado - Nome completo do estado (ex: "São Paulo", "Rio de Janeiro")
 * @property {string} regiao - Nome da região do Brasil (ex: "Sudeste", "Sul")
 * @property {string} ibge - Código IBGE do município (7 dígitos)
 * @property {string} gia - Código GIA (Guia de Informação e Apuração do ICMS) - geralmente vazio
 * @property {string} ddd - Código DDD da região (2 dígitos, ex: "11", "21")
 * @property {string} siafi - Código SIAFI (Sistema Integrado de Administração Financeira) - 4 dígitos
 * @property {boolean} [erro] - Indica se houve erro na busca (true quando CEP não encontrado)
 * 
 * @example
 * ```typescript
 * const endereco: ViaCEPResponse = {
 *   cep: "01001-000",
 *   logradouro: "Praça da Sé",
 *   complemento: "lado ímpar",
 *   unidade: "",
 *   bairro: "Sé",
 *   localidade: "São Paulo",
 *   uf: "SP",
 *   estado: "São Paulo",
 *   regiao: "Sudeste",
 *   ibge: "3550308",
 *   gia: "1004",
 *   ddd: "11",
 *   siafi: "7107"
 * };
 * ```
 */
export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

/**
 * Tipo que representa a resposta da API ViaCEP para busca por endereço.
 * 
 * Retorna um array de resultados (máximo 50 CEPs) ordenados pela proximidade
 * do nome do logradouro informado.
 * 
 * @typedef {ViaCEPResponse[]} ViaCEPSearchResponse
 */
export type ViaCEPSearchResponse = ViaCEPResponse[];

