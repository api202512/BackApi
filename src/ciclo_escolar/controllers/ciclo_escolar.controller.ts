import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  CicloEscolarDto,
  UpdateCicloEscolarDto,
} from '../dtos/ciclo_escolar.dtos';
import { CicloEscolarService } from '../services/ciclo_escolar.service';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';

@Controller('ciclo-escolar')
export class CicloEscolarController {
  constructor(private readonly cicloEscolarService: CicloEscolarService) {}
  @Get()
  getCicloEscolar(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.cicloEscolarService.findAll();
  }

  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de aulas' };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.cicloEscolarService.findOne(id);
  }

  @Post()
  create(@Body() payload: CicloEscolarDto) {
    return this.cicloEscolarService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateCicloEscolarDto,
  ) {
    return this.cicloEscolarService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.cicloEscolarService.remove(id);
  }
}
