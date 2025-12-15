/**
 * Testes unitários para validação de formato de CEP
 */

import { validarCEP } from '../validator.js';

// CEPs válidos (formato correto - 8 dígitos)
const validCEPs = [
  '01001000',
  '01001-000',
  '12345678',
  '98765432',
  '00000000',
];

// CEPs inválidos
const invalidCEPs = [
  '1234567', // Menos de 8 dígitos
  '123456789', // Mais de 8 dígitos
  '01001-00', // Formato incompleto
  '', // String vazia
  'abc-def-gh', // Apenas letras
  '12345-67', // Formato incorreto
  '123 456 78', // Com espaços
];

/**
 * Executa os testes de validação de formato de CEP
 */
export function runCEPTests(): void {
  console.log('🧪 Executando testes de validação de formato de CEP...\n');

  let passed = 0;
  let failed = 0;

  // Testa CEPs válidos
  console.log('✅ Testando CEPs válidos:');
  for (const cep of validCEPs) {
    const result = validarCEP(cep);
    if (result === true) {
      console.log(`  ✓ "${cep}" - PASSOU`);
      passed++;
    } else {
      console.log(`  ✗ "${cep}" - FALHOU (esperado: true, obtido: false)`);
      failed++;
    }
  }

  // Testa CEPs inválidos
  console.log('\n❌ Testando CEPs inválidos:');
  for (const cep of invalidCEPs) {
    const result = validarCEP(cep);
    if (result === false) {
      console.log(`  ✓ "${cep}" - PASSOU`);
      passed++;
    } else {
      console.log(`  ✗ "${cep}" - FALHOU (esperado: false, obtido: true)`);
      failed++;
    }
  }

  // Resumo
  console.log(`\n📊 Resumo: ${passed} passaram, ${failed} falharam`);
  
  if (failed === 0) {
    console.log('🎉 Todos os testes passaram!\n');
  } else {
    console.log('⚠️  Alguns testes falharam!\n');
  }
}

// Para executar os testes, importe e chame runCEPTests()
// ou adapte para seu framework de testes preferido (Jest, Vitest, etc.)

