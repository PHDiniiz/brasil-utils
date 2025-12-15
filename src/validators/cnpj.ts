/**
 * Valida um CNPJ (Cadastro Nacional de Pessoa Jurídica) brasileiro.
 * 
 * Esta função realiza a validação completa de um CNPJ, incluindo:
 * - Verificação do formato (14 dígitos)
 * - Rejeição de sequências repetidas (ex: 11.111.111/1111-11)
 * - Cálculo e validação dos dois dígitos verificadores usando o algoritmo oficial
 * 
 * A função aceita CNPJ formatado (com pontos, barra e traço) ou apenas números.
 * 
 * @param {string} cnpj - CNPJ a ser validado (aceita formatado ou apenas números)
 * @returns {boolean} Retorna `true` se o CNPJ for válido, `false` caso contrário
 * 
 * @example
 * ```typescript
 * // CNPJ válido formatado
 * validarCNPJ('11.222.333/0001-81'); // true
 * 
 * // CNPJ válido sem formatação
 * validarCNPJ('11222333000181'); // true
 * 
 * // CNPJ inválido (sequência repetida)
 * validarCNPJ('11.111.111/1111-11'); // false
 * 
 * // CNPJ inválido (dígitos verificadores incorretos)
 * validarCNPJ('11.222.333/0001-00'); // false
 * ```
 */
export function validarCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/\D/g, '');

  // Verifica se tem 14 dígitos
  if (cleanCNPJ.length !== 14) {
    return false;
  }

  // Rejeita CNPJs com todos os dígitos iguais
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) {
    return false;
  }

  // Pesos para o primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += Number.parseInt(cleanCNPJ.charAt(i), 10) * weights1[i];
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;
  
  if (firstDigit !== Number.parseInt(cleanCNPJ.charAt(12), 10)) {
    return false;
  }

  // Pesos para o segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += Number.parseInt(cleanCNPJ.charAt(i), 10) * weights2[i];
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;
  
  if (secondDigit !== Number.parseInt(cleanCNPJ.charAt(13), 10)) {
    return false;
  }

  return true;
}

