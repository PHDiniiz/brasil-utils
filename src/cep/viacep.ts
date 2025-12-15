/**
 * Funções para busca de CEP utilizando a API ViaCEP
 * Documentação: https://viacep.com.br/
 */

import { validarCEP } from './validator.js';
import type { ViaCEPResponse, ViaCEPSearchResponse } from './types.js';

const VIACEP_BASE_URL = 'https://viacep.com.br/ws';

/**
 * Busca informações de endereço a partir de um CEP utilizando a API ViaCEP.
 * 
 * Esta função realiza uma consulta à API gratuita do ViaCEP para obter
 * informações completas do endereço correspondente ao CEP informado.
 * 
 * A função valida o formato do CEP antes de fazer a requisição e trata
 * automaticamente erros de rede e CEPs não encontrados.
 * 
 * @param {string} cep - CEP a ser consultado (aceita formatado ou apenas números)
 * @returns {Promise<ViaCEPResponse | null>} Promise que resolve com os dados do endereço
 * ou `null` se o CEP não for encontrado, tiver formato inválido ou ocorrer erro na requisição
 * 
 * @example
 * ```typescript
 * // Busca CEP válido - todos os campos disponíveis
 * const endereco = await buscarCEP('01001000');
 * if (endereco) {
 *   // Campos principais
 *   console.log(endereco.cep); // "01001-000"
 *   console.log(endereco.logradouro); // "Praça da Sé"
 *   console.log(endereco.complemento); // "lado ímpar"
 *   console.log(endereco.unidade); // ""
 *   console.log(endereco.bairro); // "Sé"
 *   console.log(endereco.localidade); // "São Paulo"
 *   console.log(endereco.uf); // "SP"
 *   
 *   // Informações adicionais
 *   console.log(endereco.estado); // "São Paulo"
 *   console.log(endereco.regiao); // "Sudeste"
 *   console.log(endereco.ibge); // "3550308"
 *   console.log(endereco.gia); // "1004"
 *   console.log(endereco.ddd); // "11"
 *   console.log(endereco.siafi); // "7107"
 * }
 * 
 * // CEP não encontrado
 * const endereco2 = await buscarCEP('99999999');
 * // Retorna: null
 * 
 * // CEP com formato inválido
 * const endereco3 = await buscarCEP('12345');
 * // Retorna: null
 * ```
 * 
 * @see {@link https://viacep.com.br/} Documentação da API ViaCEP
 */
export async function buscarCEP(cep: string): Promise<ViaCEPResponse | null> {
  try {
    // Valida o formato do CEP antes de fazer a requisição
    if (!validarCEP(cep)) {
      return null;
    }

    // Remove formatação do CEP
    const cleanCEP = cep.replace(/\D/g, '');

    // Faz requisição para a API ViaCEP
    const response = await fetch(`${VIACEP_BASE_URL}/${cleanCEP}/json/`);

    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      return null;
    }

    // Parse da resposta JSON
    const data = (await response.json()) as ViaCEPResponse;

    // Verifica se o CEP foi encontrado (API retorna { erro: true } quando não encontra)
    if (data.erro === true) {
      return null;
    }

    return data;
  } catch {
    // Em caso de erro de rede ou outro erro, retorna null silenciosamente
    // Erros são tratados silenciosamente para não expor detalhes de implementação
    return null;
  }
}

/**
 * Busca CEPs a partir de UF, cidade e logradouro utilizando a API ViaCEP.
 * 
 * Esta função realiza uma busca na API gratuita do ViaCEP para encontrar
 * CEPs que correspondam aos parâmetros informados. Os resultados são ordenados
 * pela proximidade do nome do logradouro.
 * 
 * A função valida os parâmetros antes de fazer a requisição:
 * - UF deve ter exatamente 2 caracteres
 * - Cidade deve ter no mínimo 3 caracteres
 * - Logradouro deve ter no mínimo 3 caracteres
 * 
 * @param {string} uf - Unidade Federativa (2 caracteres, ex: "SP", "RJ", "RS")
 * @param {string} cidade - Nome da cidade (mínimo 3 caracteres)
 * @param {string} logradouro - Nome do logradouro (mínimo 3 caracteres)
 * @returns {Promise<ViaCEPSearchResponse>} Promise que resolve com um array de resultados
 * (máximo 50 CEPs) ou array vazio se não encontrar resultados, parâmetros inválidos ou ocorrer erro
 * 
 * @example
 * ```typescript
 * // Busca por endereço completo - todos os campos disponíveis em cada resultado
 * const ceps = await buscarCEPPorEndereco('SP', 'São Paulo', 'Praça da Sé');
 * if (ceps.length > 0) {
 *   ceps.forEach((endereco) => {
 *     // Todos os campos da ViaCEPResponse estão disponíveis
 *     console.log(`CEP: ${endereco.cep}`);
 *     console.log(`Logradouro: ${endereco.logradouro}`);
 *     console.log(`Bairro: ${endereco.bairro}`);
 *     console.log(`Cidade: ${endereco.localidade}`);
 *     console.log(`UF: ${endereco.uf}`);
 *     console.log(`Estado: ${endereco.estado}`);
 *     console.log(`Região: ${endereco.regiao}`);
 *     console.log(`IBGE: ${endereco.ibge}`);
 *     console.log(`DDD: ${endereco.ddd}`);
 *     console.log(`SIAFI: ${endereco.siafi}`);
 *   });
 * }
 * 
 * // Busca parcial (retorna múltiplos resultados)
 * const ceps2 = await buscarCEPPorEndereco('RS', 'Porto Alegre', 'Domingos');
 * // Retorna: Array com todos os logradouros que contenham "Domingos"
 * // Cada item do array contém todos os campos: cep, logradouro, complemento, 
 * // unidade, bairro, localidade, uf, estado, regiao, ibge, gia, ddd, siafi
 * 
 * // Parâmetros inválidos
 * const ceps3 = await buscarCEPPorEndereco('S', 'SP', 'Pa');
 * // Retorna: [] (array vazio)
 * ```
 * 
 * @see {@link https://viacep.com.br/} Documentação da API ViaCEP
 */
export async function buscarCEPPorEndereco(
  uf: string,
  cidade: string,
  logradouro: string,
): Promise<ViaCEPSearchResponse> {
  try {
    // Valida parâmetros
    if (!uf?.length || uf.length !== 2) {
      return [];
    }

    if (!cidade?.length || cidade.length < 3) {
      return [];
    }

    if (!logradouro?.length || logradouro.length < 3) {
      return [];
    }

    // Codifica os parâmetros para URL
    const encodedUF = encodeURIComponent(uf.toUpperCase());
    const encodedCidade = encodeURIComponent(cidade);
    const encodedLogradouro = encodeURIComponent(logradouro);

    // Faz requisição para a API ViaCEP
    const response = await fetch(
      `${VIACEP_BASE_URL}/${encodedUF}/${encodedCidade}/${encodedLogradouro}/json/`,
    );

    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      return [];
    }

    // Parse da resposta JSON
    const data = (await response.json()) as ViaCEPSearchResponse;

    // Verifica se é um array válido
    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch {
    // Em caso de erro de rede ou outro erro, retorna array vazio silenciosamente
    // Erros são tratados silenciosamente para não expor detalhes de implementação
    return [];
  }
}

