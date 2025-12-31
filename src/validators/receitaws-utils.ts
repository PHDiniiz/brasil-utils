/**
 * Funções utilitárias para a API ReceitaWS
 * Documentação: https://developers.receitaws.com.br/
 */

import { ReceitaWSResponse, ReceitaWSStatusResponse } from "../cep/types";

const RECEITAWS_BASE_URL = "https://www.receitaws.com.br/v1";

/**
 * Consulta informações de CNPJ (empresa) na ReceitaWS.
 * @see buscarCNPJ em receitaws.ts
 */
// ...existing code...

/**
 * Consulta o status da API ReceitaWS (útil para monitoramento e fallback)
 * @returns {Promise<ReceitaWSStatusResponse | null>} Status da API ou null em caso de erro
 * @see https://developers.receitaws.com.br/#/operations/status
 */
export async function consultarStatusReceitaWS(): Promise<ReceitaWSStatusResponse | null> {
  try {
    const response = await fetch(`${RECEITAWS_BASE_URL}/status`);
    if (!response.ok) return null;
    const data = (await response.json()) as ReceitaWSStatusResponse;
    return data;
  } catch {
    return null;
  }
}

/**
 * Consulta informações de CNPJ usando o endpoint de proxy (útil para contornar limites de requisição)
 * @param {string} cnpj - CNPJ a ser consultado
 * @returns {Promise<ReceitaWSResponse | null>}
 * @see https://developers.receitaws.com.br/#/operations/queryRFFree
 */
export async function buscarCNPJProxy(
  cnpj: string
): Promise<ReceitaWSResponse | null> {
  try {
    const cleanCNPJ = cnpj.replace(/\D/g, "");
    if (cleanCNPJ.length !== 14) return null;
    const response = await fetch(`${RECEITAWS_BASE_URL}/rf/${cleanCNPJ}`);
    if (!response.ok) return null;
    const data = (await response.json()) as ReceitaWSResponse;
    if (data.status === "ERROR") return null;
    return data;
  } catch {
    return null;
  }
}
