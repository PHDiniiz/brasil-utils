/**
 * Testes unitários para validação de CNPJ
 */

import { validarCNPJ } from '../cnpj.js';

// CNPJs válidos conhecidos
const validCNPJs = [
  '11.222.333/0001-81',
  '11222333000181',
  '00.000.000/0001-91',
  '00000000000191',
  '12.345.678/0001-95',
  '12345678000195',
];

// CNPJs inválidos
const invalidCNPJs = [
  '11.111.111/1111-11', // Sequência repetida
  '22.222.222/2222-22', // Sequência repetida
  '11.222.333/0001-00', // Dígitos verificadores incorretos
  '11222333000100',
  '11.222.333/0001', // Formato incompleto
  '112223330001', // Menos de 14 dígitos
  '11.222.333/0001-811', // Mais de 14 dígitos
  '112223330001811',
  '', // String vazia
  'ab.cde.fgh/ijkl-mn', // Apenas letras
  '00.000.000/0000-00', // Sequência de zeros
];

/**
 * Executa os testes de validação de CNPJ
 */
export function runCNPJTests(): void {
  console.log('🧪 Executando testes de validação de CNPJ...\n');

  let passed = 0;
  let failed = 0;

  // Testa CNPJs válidos
  console.log('✅ Testando CNPJs válidos:');
  for (const cnpj of validCNPJs) {
    const result = validarCNPJ(cnpj);
    if (result === true) {
      console.log(`  ✓ "${cnpj}" - PASSOU`);
      passed++;
    } else {
      console.log(`  ✗ "${cnpj}" - FALHOU (esperado: true, obtido: false)`);
      failed++;
    }
  }

  // Testa CNPJs inválidos
  console.log('\n❌ Testando CNPJs inválidos:');
  for (const cnpj of invalidCNPJs) {
    const result = validarCNPJ(cnpj);
    if (result === false) {
      console.log(`  ✓ "${cnpj}" - PASSOU`);
      passed++;
    } else {
      console.log(`  ✗ "${cnpj}" - FALHOU (esperado: false, obtido: true)`);
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

// Para executar os testes, importe e chame runCNPJTests()
// ou adapte para seu framework de testes preferido (Jest, Vitest, etc.)

