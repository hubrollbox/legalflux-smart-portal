
import { Controller, Get, Post, Body, Res, HttpStatus } from "@nestjs/common";
import { CasesService } from "./cases.service";

@Controller("cases")
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get()
  async findAll(@Res() res) {
    // Mock chamar findAll
    const cases = await this.casesService.findAll();
    return res.status(HttpStatus.OK).json(cases);
  }

  @Post()
  async create(@Body() body, @Res() res) {
    const result = await this.casesService.create(body);
    return res.status(HttpStatus.CREATED).json(result);
  }
}
