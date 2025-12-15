/**
 * Valida um CPF (Cadastro de Pessoa Física).
 * 
 * Esta função realiza a validação completa de um CPF, incluindo:
 * - Verificação do formato (11 dígitos)
 * - Rejeição de sequências repetidas (ex: 111.111.111-11)
 * - Cálculo e validação dos dois dígitos verificadores usando o algoritmo oficial
 * 
 * A função aceita CPF formatado (com pontos e traço) ou apenas números.
 * 
 * @param {string} cpf - CPF a ser validado (aceita formatado ou apenas números)
 * @returns {boolean} Retorna `true` se o CPF for válido, `false` caso contrário
 * 
 * @example
 * ```typescript
 * // CPF válido formatado
 * validarCPF('123.456.789-09'); // true
 * 
 * // CPF válido sem formatação
 * validarCPF('12345678909'); // true
 * 
 * // CPF inválido (sequência repetida)
 * validarCPF('111.111.111-11'); // false
 * 
 * // CPF inválido (dígitos verificadores incorretos)
 * validarCPF('123.456.789-00'); // false
 * ```
 */
export function validarCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');

  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) {
    return false;
  }

  // Rejeita CPFs com todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cleanCPF.charAt(i), 10) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== Number.parseInt(cleanCPF.charAt(9), 10)) {
    return false;
  }

  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cleanCPF.charAt(i), 10) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== Number.parseInt(cleanCPF.charAt(10), 10)) {
    return false;
  }

  return true;
}

