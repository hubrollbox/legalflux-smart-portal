
import { Injectable } from "@nestjs/common";
import { SqsService } from "./sqs.service";

@Injectable()
export class CasesService {
  private cases = [
    { id: "id1", numero: "2024/001", descricao: "Exemplo 1" }
  ];

  constructor(private readonly sqsService: SqsService) {}

  async findAll() {
    // Apenas mock de dados
    return this.cases;
  }

  async create(data: any) {
    const newCase = { id: String(Date.now()), ...data };
    this.cases.push(newCase);

    // Disparar notificação assíncrona (exemplo)
    await this.sqsService.sendMessage({
      type: "NEW_CASE",
      payload: newCase,
    });
    return newCase;
  }
}
