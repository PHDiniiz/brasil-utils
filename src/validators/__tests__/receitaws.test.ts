import { buscarCNPJ } from "../../libs/receitaws";

// Teste básico para buscar um CNPJ válido e inválido usando top-level await

// CNPJ válido
const cnpjValido = "27865757000102";
const empresa = await buscarCNPJ(cnpjValido);
console.log("CNPJ válido:", empresa);

// CNPJ inexistente
const cnpjInexistente = "00000000000000";
const empresa2 = await buscarCNPJ(cnpjInexistente);
console.log("CNPJ inexistente:", empresa2);

// CNPJ inválido
const cnpjInvalido = "12345";
const empresa3 = await buscarCNPJ(cnpjInvalido);
console.log("CNPJ inválido:", empresa3);
