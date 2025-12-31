import { describe, it, expect } from "vitest";
import { buscarCNPJ } from "../../libs/receitaws.js";

describe("buscarCNPJ (ReceitaWS)", () => {
  it.skip("busca CNPJ válido (real API)", async () => {
    const empresa = await buscarCNPJ("27865757000102");
    expect(empresa).toBeTruthy();
    expect(empresa?.nome).toBeTypeOf("string");
    expect(empresa?.status).toBe("OK");
  });
  it.skip("retorna null para CNPJ inexistente (real API)", async () => {
    const empresa = await buscarCNPJ("00000000000000");
    expect(empresa).toBeNull();
  });
  it("retorna null para CNPJ com formato inválido", async () => {
    const empresa = await buscarCNPJ("12345");
    expect(empresa).toBeNull();
  });
});
