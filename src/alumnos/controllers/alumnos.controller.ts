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

import { AlumnoDto, UpdateAlumnoDto } from '../dtos/alumnos.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { AlumnoService } from '../services/alumnos.service';

@Controller('alumno')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) {}

  @Get()
  getAlumnos(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ) {
    return this.alumnoService.findAll();
  }

  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de alumnos' };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.alumnoService.findOne(id);
  }

  @Post()
  create(@Body() payload: AlumnoDto) {
    return this.alumnoService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAlumnoDto,
  ) {
    return this.alumnoService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.alumnoService.remove(id);
  }
}
