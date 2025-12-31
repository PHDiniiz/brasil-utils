/**
 * Valida o formato de um CEP (Código de Endereçamento Postal) brasileiro.
 * 
 * Esta função verifica se o CEP possui o formato correto:
 * - Deve ter exatamente 8 dígitos numéricos
 * - Remove automaticamente caracteres não numéricos antes da validação
 * 
 * A função aceita CEP formatado (com traço) ou apenas números.
 * 
 * @param {string} cep - CEP a ser validado (aceita formatado ou apenas números)
 * @returns {boolean} Retorna `true` se o CEP tiver formato válido (8 dígitos), `false` caso contrário
 * 
 * @example
 * ```typescript
 * // CEP válido sem formatação
 * validarCEP('01001000'); // true
 * 
 * // CEP válido formatado
 * validarCEP('01001-000'); // true
 * 
 * // CEP inválido (menos de 8 dígitos)
 * validarCEP('12345'); // false
 * 
 * // CEP inválido (mais de 8 dígitos)
 * validarCEP('123456789'); // false
 * ```
 */
export function validarCEP(cep: string): boolean {
  // Não pode conter espaços
  if (/\s/.test(cep)) {
    return false;
  }
  // Remove caracteres não numéricos
  const cleanCEP = cep.replaceAll(/\D/g, '');
  // CEP deve ter exatamente 8 dígitos e ser só números
  return cleanCEP.length === 8 && /^\d{8}$/.test(cleanCEP);
}

