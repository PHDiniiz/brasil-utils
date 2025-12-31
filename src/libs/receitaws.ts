// Para Node.js 18+, fetch e Response são globais. Se usar Node < 18, instale node-fetch e ajuste os imports.
/**
 * Funções para busca de CNPJ utilizando a API ReceitaWS
 * Documentação: https://receitaws.com.br/
 */

import type { ReceitaWSResponse } from "../cep/types.js";

const RECEITAWS_BASE_URL = "https://www.receitaws.com.br/v1/cnpj";

/**
 * Busca informações de empresa a partir de um CNPJ utilizando a API ReceitaWS.
 *
 * Esta função realiza uma consulta à API gratuita da ReceitaWS para obter
 * informações completas da empresa correspondente ao CNPJ informado.
 *
 * A função valida o formato do CNPJ antes de fazer a requisição e trata
 * automaticamente erros de rede e CNPJs não encontrados.
 *
 * @param {string} cnpj - CNPJ a ser consultado (aceita formatado ou apenas números)
 * @returns {Promise<ReceitaWSResponse | null>} Promise que resolve com os dados da empresa
 * ou `null` se o CNPJ não for encontrado, tiver formato inválido ou ocorrer erro na requisição
 *
 * @example
 * ```typescript
 * // Busca CNPJ válido
 * const empresa = await buscarCNPJ('27865757000102');
 * if (empresa) {
 *   console.log(empresa.nome); // "CAIXA ECONOMICA FEDERAL"
 *   console.log(empresa.fantasia); // "CAIXA ECONOMICA FEDERAL"
 *   // ... outros campos
 * }
 *
 * // CNPJ não encontrado
 * const empresa2 = await buscarCNPJ('00000000000000');
 * // Retorna: null
 *
 * // CNPJ com formato inválido
 * const empresa3 = await buscarCNPJ('12345');
 * // Retorna: null
 * ```
 *
 * @see {@link https://receitaws.com.br/} Documentação da API ReceitaWS
 */
export async function buscarCNPJ(
  cnpj: string
): Promise<ReceitaWSResponse | null> {
  try {
    // Remove formatação do CNPJ
    const cleanCNPJ = cnpj.replaceAll(/\D/g, "");
    // Valida o formato do CNPJ (14 dígitos)
    if (cleanCNPJ.length !== 14) {
      return null;
    }

    // Faz requisição para a API ReceitaWS
    const response = await fetch(`${RECEITAWS_BASE_URL}/${cleanCNPJ}`);

    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      return null;
    }

    // Parse da resposta JSON
    const data = (await response.json()) as ReceitaWSResponse;

    // Verifica se houve erro na resposta
    if (data.status === "ERROR") {
      return null;
    }

    return data;
  } catch {
    // Em caso de erro de rede ou outro erro, retorna null silenciosamente
    return null;
  }
}
