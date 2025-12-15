/**
 * Valida um telefone fixo brasileiro.
 * 
 * Esta função valida telefones fixos brasileiros com as seguintes regras:
 * - Deve ter 10 dígitos (2 dígitos do DDD + 8 dígitos do número)
 * - DDD deve estar entre 11 e 99
 * - O primeiro dígito do número não pode ser 0 ou 1
 * 
 * A função aceita telefone formatado (com parênteses, espaços e traços) ou apenas números.
 * 
 * @param {string} telefone - Telefone a ser validado (aceita formatado ou apenas números)
 * @returns {boolean} Retorna `true` se o telefone for válido, `false` caso contrário
 * 
 * @example
 * ```typescript
 * // Telefone válido formatado
 * validarTelefone('(11) 3456-7890'); // true
 * 
 * // Telefone válido sem formatação
 * validarTelefone('1134567890'); // true
 * 
 * // Celular (inválido para telefone fixo)
 * validarTelefone('(11) 91234-5678'); // false
 * 
 * // DDD inválido
 * validarTelefone('(10) 3456-7890'); // false
 * ```
 */
export function validarTelefone(telefone: string): boolean {
  // Remove caracteres não numéricos
  const cleanPhone = telefone.replace(/\D/g, '');

  // Telefone fixo deve ter 10 dígitos (2 DDD + 8 número)
  if (cleanPhone.length !== 10) {
    return false;
  }

  // Valida DDD (11-99)
  const ddd = Number.parseInt(cleanPhone.substring(0, 2), 10);
  if (ddd < 11 || ddd > 99) {
    return false;
  }

  // Telefone fixo não pode começar com 0 ou 1
  const firstDigit = Number.parseInt(cleanPhone.charAt(2), 10);
  if (firstDigit === 0 || firstDigit === 1) {
    return false;
  }

  return true;
}

/**
 * Valida um celular brasileiro.
 * 
 * Esta função valida celulares brasileiros com as seguintes regras:
 * - Deve ter 11 dígitos (2 dígitos do DDD + 9 dígitos do número)
 * - DDD deve estar entre 11 e 99
 * - O primeiro dígito do número (após o DDD) deve ser 9
 * 
 * A função aceita celular formatado (com parênteses, espaços e traços) ou apenas números.
 * 
 * @param {string} celular - Celular a ser validado (aceita formatado ou apenas números)
 * @returns {boolean} Retorna `true` se o celular for válido, `false` caso contrário
 * 
 * @example
 * ```typescript
 * // Celular válido formatado
 * validarCelular('(11) 91234-5678'); // true
 * 
 * // Celular válido sem formatação
 * validarCelular('11912345678'); // true
 * 
 * // Telefone fixo (inválido para celular)
 * validarCelular('(11) 3456-7890'); // false
 * 
 * // Não começa com 9
 * validarCelular('(11) 81234-5678'); // false
 * 
 * // DDD inválido
 * validarCelular('(10) 91234-5678'); // false
 * ```
 */
export function validarCelular(celular: string): boolean {
  // Remove caracteres não numéricos
  const cleanCellphone = celular.replace(/\D/g, '');

  // Celular deve ter 11 dígitos (2 DDD + 9 número)
  if (cleanCellphone.length !== 11) {
    return false;
  }

  // Valida DDD (11-99)
  const ddd = Number.parseInt(cleanCellphone.substring(0, 2), 10);
  if (ddd < 11 || ddd > 99) {
    return false;
  }

  // Celular deve começar com 9 após o DDD
  const firstDigit = Number.parseInt(cleanCellphone.charAt(2), 10);
  if (firstDigit !== 9) {
    return false;
  }

  return true;
}

