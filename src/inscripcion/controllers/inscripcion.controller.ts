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
  InscripcionDto,
  UpdateInscripcionDto,
} from '../dtos/inscripciones.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { InscripcionService } from '../services/inscripcion.service';

@Controller('inscripciones')
export class InscripcionController {
  constructor(private readonly inscripcionService: InscripcionService) {}

  @Get()
  getInscripciones(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.inscripcionService.findAll();
  }

  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de inscripciones' };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.inscripcionService.findOne(id);
  }

  @Post()
  create(@Body() payload: InscripcionDto) {
    return this.inscripcionService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateInscripcionDto,
  ) {
    return this.inscripcionService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.inscripcionService.remove(id);
  }
}
