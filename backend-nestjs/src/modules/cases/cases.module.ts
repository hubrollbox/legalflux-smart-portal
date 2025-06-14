
import { Module } from "@nestjs/common";
import { CasesController } from "./cases.controller";
import { CasesService } from "./cases.service";
import { SqsService } from "./sqs.service";

@Module({
  controllers: [CasesController],
  providers: [CasesService, SqsService],
})
export class CasesModule {}
