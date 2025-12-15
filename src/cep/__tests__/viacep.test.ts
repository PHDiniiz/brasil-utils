/**
 * Testes unitários para funções de busca de CEP na API ViaCEP
 * 
 * ATENÇÃO: Estes testes fazem requisições reais para a API ViaCEP.
 * Use com moderação para evitar rate limiting.
 * Para testes em CI/CD, considere usar mocks.
 */

import { buscarCEP, buscarCEPPorEndereco } from '../viacep.js';

/**
 * Executa os testes de busca de CEP
 * 
 * @param runRealTests - Se true, executa testes reais com a API (padrão: false)
 */
export async function runViaCEPTests(runRealTests: boolean = false): Promise<void> {
  console.log('🧪 Executando testes de busca de CEP na API ViaCEP...\n');

  if (!runRealTests) {
    console.log('⚠️  Testes reais desabilitados por padrão para evitar rate limiting.');
    console.log('   Para executar testes reais, chame: runViaCEPTests(true)\n');
    return;
  }

  let passed = 0;
  let failed = 0;

  // Teste 1: Busca CEP válido
  console.log('✅ Testando buscaCEP com CEP válido:');
  try {
    const result = await buscarCEP('01001000');
    if (result && result.cep && result.logradouro) {
      console.log(`  ✓ CEP encontrado: ${result.cep} - ${result.logradouro}`);
      passed++;
    } else {
      console.log('  ✗ CEP não encontrado ou resposta inválida');
      failed++;
    }
  } catch (error) {
    console.log(`  ✗ Erro ao buscar CEP: ${error}`);
    failed++;
  }

  // Teste 2: Busca CEP inválido (não encontrado)
  console.log('\n❌ Testando buscaCEP com CEP não encontrado:');
  try {
    const result = await buscarCEP('99999999');
    if (result === null) {
      console.log('  ✓ CEP não encontrado retornou null corretamente');
      passed++;
    } else {
      console.log('  ✗ Esperado null para CEP não encontrado');
      failed++;
    }
  } catch (error) {
    console.log(`  ✗ Erro ao buscar CEP: ${error}`);
    failed++;
  }

  // Teste 3: Busca CEP com formato inválido
  console.log('\n❌ Testando buscaCEP com formato inválido:');
  try {
    const result = await buscarCEP('12345');
    if (result === null) {
      console.log('  ✓ CEP com formato inválido retornou null corretamente');
      passed++;
    } else {
      console.log('  ✗ Esperado null para formato inválido');
      failed++;
    }
  } catch (error) {
    console.log(`  ✗ Erro ao buscar CEP: ${error}`);
    failed++;
  }

  // Teste 4: Busca por endereço válido
  console.log('\n✅ Testando buscaCEPPorEndereco com parâmetros válidos:');
  try {
    const result = await buscarCEPPorEndereco('SP', 'São Paulo', 'Praça da Sé');
    if (Array.isArray(result) && result.length > 0) {
      console.log(`  ✓ Encontrados ${result.length} CEP(s)`);
      passed++;
    } else {
      console.log('  ✗ Nenhum CEP encontrado ou resposta inválida');
      failed++;
    }
  } catch (error) {
    console.log(`  ✗ Erro ao buscar por endereço: ${error}`);
    failed++;
  }

  // Teste 5: Busca por endereço com parâmetros inválidos
  console.log('\n❌ Testando buscaCEPPorEndereco com parâmetros inválidos:');
  try {
    const result = await buscarCEPPorEndereco('S', 'SP', 'Pa');
    if (Array.isArray(result) && result.length === 0) {
      console.log('  ✓ Parâmetros inválidos retornaram array vazio corretamente');
      passed++;
    } else {
      console.log('  ✗ Esperado array vazio para parâmetros inválidos');
      failed++;
    }
  } catch (error) {
    console.log(`  ✗ Erro ao buscar por endereço: ${error}`);
    failed++;
  }

  // Resumo
  console.log(`\n📊 Resumo: ${passed} passaram, ${failed} falharam`);
  
  if (failed === 0) {
    console.log('🎉 Todos os testes passaram!\n');
  } else {
    console.log('⚠️  Alguns testes falharam!\n');
  }
}

// Para executar os testes, importe e chame runViaCEPTests(true)
// ou adapte para seu framework de testes preferido (Jest, Vitest, etc.)

