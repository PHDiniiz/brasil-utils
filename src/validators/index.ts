/**
 * Módulo de validadores brasileiros
 * Exporta funções para validação de CPF, CNPJ, Telefone e Celular
 */

export { validarCPF } from "./cpf.js";
export { validarCNPJ } from "./cnpj.js";
export { buscarCNPJ } from "../libs/receitaws.js";
export * from "./receitaws-utils.js";

export { validarTelefone, validarCelular } from "./phone.js";
