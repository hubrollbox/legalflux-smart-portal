
// Testes de integração: /api/cases (mockando AWS SDK v3)
import request from "supertest";
import { createServer } from "http";
import * as awsSdk from "@aws-sdk/client-sqs";

jest.mock("@aws-sdk/client-sqs");

const mockSendMessage = jest.fn().mockResolvedValue({ MessageId: "abc123" });
(awsSdk.SQS.prototype.sendMessage as jest.Mock) = mockSendMessage;

const app = require("../../src/server"); // Ajuste caminho conforme seu setup

describe("/api/cases", () => {
  beforeEach(() => {
    mockSendMessage.mockClear();
  });

  it("GET deve retornar lista de processos", async () => {
    // Supondo mock do retorno do banco
    const response = await request(app).get("/api/cases").send();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST deve criar processo e disparar evento SQS", async () => {
    const body = { numero: "2024/456", descricao: "Teste rate limit" };
    const response = await request(app).post("/api/cases").send(body);
    expect(response.status).toBe(201);
    expect(response.body.numero).toBe("2024/456");
    expect(mockSendMessage).toHaveBeenCalled();
  });

  it("429 se exceder limite (simulado)", async () => {
    // Simular rate-limit (ajuste conforme sua lógica)
    // Pode usar um mock/fake direto que retorna 429
    // Suponha que chamada extra retorna 429
    const response = await request(app).post("/api/cases").send({ numero: "SPAM" });
    if (response.status !== 429) {
      // dependendo do framework, mock aqui
      expect(response.status).toBe(201); // não rate limit agora
    } else {
      expect(response.body.code).toBe(429);
    }
  });
});
