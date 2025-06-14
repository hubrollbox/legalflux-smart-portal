
// Serviço mínimo de publish SQS usando AWS SDK v3 (real ou mock)
import { Injectable } from "@nestjs/common";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

@Injectable()
export class SqsService {
  private sqs: SQSClient;
  private queueUrl: string;

  constructor() {
    this.sqs = new SQSClient({ region: process.env.AWS_REGION });
    this.queueUrl = process.env.SQS_URL!;
  }

  async sendMessage(message: any) {
    // Transforma em string, simples
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(message),
    });
    await this.sqs.send(command);
  }
}
