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

import { MateriaDto, UpdateMateriaDto } from '../dtos/materias.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { MateriasService } from '../services/materias.service';

@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Get()
  getMaterias(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ) {
    return this.materiasService.findAll();
  }

  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de materias' };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.materiasService.findOne(id);
  }

  @Post()
  create(@Body() payload: MateriaDto) {
    return this.materiasService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateMateriaDto,
  ) {
    return this.materiasService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.materiasService.remove(id);
  }
}
