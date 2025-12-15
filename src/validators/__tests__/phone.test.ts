/**
 * Testes unitários para validação de Telefone e Celular
 */

import { validarTelefone, validarCelular } from '../phone.js';

// Telefones válidos
const validPhones = [
  '(11) 3456-7890',
  '1134567890',
  '(21) 2234-5678',
  '2122345678',
  '(47) 3333-4444',
  '4733334444',
  '(85) 9876-5432',
  '8598765432',
];

// Telefones inválidos
const invalidPhones = [
  '(11) 91234-5678', // Celular (começa com 9)
  '11912345678',
  '(10) 3456-7890', // DDD inválido
  '1034567890',
  '(11) 2345-6789', // Começa com 2 (válido, mas vamos testar)
  '1123456789',
  '(11) 1234-5678', // Começa com 1 (inválido)
  '1112345678',
  '(11) 3456-789', // Menos de 10 dígitos
  '113456789',
  '', // String vazia
  'abc-def-ghij', // Apenas letras
];

// Celulares válidos
const validCellphones = [
  '(11) 91234-5678',
  '11912345678',
  '(21) 98765-4321',
  '21987654321',
  '(47) 91234-5678',
  '47912345678',
  '(85) 99999-9999',
  '85999999999',
];

// Celulares inválidos
const invalidCellphones = [
  '(11) 3456-7890', // Telefone fixo
  '1134567890',
  '(11) 81234-5678', // Não começa com 9
  '11812345678',
  '(10) 91234-5678', // DDD inválido
  '10912345678',
  '(11) 9123-4567', // Menos de 11 dígitos
  '1191234567',
  '(11) 91234-56789', // Mais de 11 dígitos
  '119123456789',
  '', // String vazia
  'abc-def-ghijk', // Apenas letras
];

/**
 * Executa os testes de validação de Telefone
 */
export function runPhoneTests(): void {
  console.log('🧪 Executando testes de validação de Telefone...\n');

  let passed = 0;
  let failed = 0;

  // Testa telefones válidos
  console.log('✅ Testando telefones válidos:');
  for (const phone of validPhones) {
    const result = validarTelefone(phone);
    if (result === true) {
      console.log(`  ✓ "${phone}" - PASSOU`);
      passed++;
    } else {
      console.log(`  ✗ "${phone}" - FALHOU (esperado: true, obtido: false)`);
      failed++;
    }
  }

  // Testa telefones inválidos
  console.log('\n❌ Testando telefones inválidos:');
  for (const phone of invalidPhones) {
    const result = validarTelefone(phone);
    if (result === false) {
      console.log(`  ✓ "${phone}" - PASSOU`);
      passed++;
    } else {
      console.log(`  ✗ "${phone}" - FALHOU (esperado: false, obtido: true)`);
      failed++;
    }
  }

  // Resumo
  console.log(`\n📊 Resumo Telefone: ${passed} passaram, ${failed} falharam`);
  
  if (failed === 0) {
    console.log('🎉 Todos os testes de telefone passaram!\n');
  } else {
    console.log('⚠️  Alguns testes de telefone falharam!\n');
  }
}

/**
 * Executa os testes de validação de Celular
 */
export function runCellphoneTests(): void {
  console.log('🧪 Executando testes de validação de Celular...\n');

  let passed = 0;
  let failed = 0;

  // Testa celulares válidos
  console.log('✅ Testando celulares válidos:');
  for (const cellphone of validCellphones) {
    const result = validarCelular(cellphone);
    if (result === true) {
      console.log(`  ✓ "${cellphone}" - PASSOU`);
      passed++;
    } else {
      console.log(`  ✗ "${cellphone}" - FALHOU (esperado: true, obtido: false)`);
      failed++;
    }
  }

  // Testa celulares inválidos
  console.log('\n❌ Testando celulares inválidos:');
  for (const cellphone of invalidCellphones) {
    const result = validarCelular(cellphone);
    if (result === false) {
      console.log(`  ✓ "${cellphone}" - PASSOU`);
      passed++;
    } else {
      console.log(`  ✗ "${cellphone}" - FALHOU (esperado: false, obtido: true)`);
      failed++;
    }
  }

  // Resumo
  console.log(`\n📊 Resumo Celular: ${passed} passaram, ${failed} falharam`);
  
  if (failed === 0) {
    console.log('🎉 Todos os testes de celular passaram!\n');
  } else {
    console.log('⚠️  Alguns testes de celular falharam!\n');
  }
}

// Para executar os testes, importe e chame runPhoneTests() e runCellphoneTests()
// ou adapte para seu framework de testes preferido (Jest, Vitest, etc.)

