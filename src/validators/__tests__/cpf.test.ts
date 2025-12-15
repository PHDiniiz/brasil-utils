/**
 * Testes unitários para validação de CPF
 */

import { validarCPF } from '../cpf.js';

// CPFs válidos conhecidos (calculados corretamente)
const validCPFs = [
  '111.444.777-35',
  '11144477735',
  '000.000.001-91',
  '00000000191',
];

// CPFs inválidos
const invalidCPFs = [
  '111.111.111-11', // Sequência repetida
  '222.222.222-22', // Sequência repetida
  '123.456.789-09', // Dígitos verificadores incorretos
  '12345678909',
  '123.456.789', // Formato incompleto
  '123456789', // Menos de 11 dígitos
  '123.456.789-091', // Mais de 11 dígitos
  '123456789091',
  '', // String vazia
  'abc.def.ghi-jk', // Apenas letras
  '000.000.000-00', // Sequência de zeros
];

/**
 * Executa os testes de validação de CPF
 */
export function runCPFTests(): void {
  console.log('🧪 Executando testes de validação de CPF...\n');

  let passed = 0;
  let failed = 0;

  // Testa CPFs válidos
  console.log('✅ Testando CPFs válidos:');
  for (const cpf of validCPFs) {
    const result = validarCPF(cpf);
    if (result === true) {
      console.log(`  ✓ "${cpf}" - PASSOU`);
      passed++;
    } else {
      console.log(`  ✗ "${cpf}" - FALHOU (esperado: true, obtido: false)`);
      failed++;
    }
  }

  // Testa CPFs inválidos
  console.log('\n❌ Testando CPFs inválidos:');
  for (const cpf of invalidCPFs) {
    const result = validarCPF(cpf);
    if (result === false) {
      console.log(`  ✓ "${cpf}" - PASSOU`);
      passed++;
    } else {
      console.log(`  ✗ "${cpf}" - FALHOU (esperado: false, obtido: true)`);
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

// Para executar os testes, importe e chame runCPFTests()
// ou adapte para seu framework de testes preferido (Jest, Vitest, etc.)

