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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Alumno')
@Controller('alumno')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los alumnos' })
  @ApiResponse({ status: 200, description: 'Lista de alumnos.' })
  getAlumnos(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.alumnoService.findAll();
  }

  @Get('filter')
  @ApiOperation({ summary: 'yo soy un filtro de alumnos' })
  @ApiResponse({ status: 200, description: 'ejemplo' })
  getFilter() {
    return { message: 'yo soy un filtro de alumnos' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener alumno por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Alumno encontrado.',
    type: AlumnoDto,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.alumnoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo alumno' })
  @ApiResponse({ status: 201, description: 'Alumno creado.', type: AlumnoDto })
  create(@Body() payload: AlumnoDto) {
    return this.alumnoService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar alumno por ID' })
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAlumnoDto,
  ) {
    return this.alumnoService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar alumno por ID' })
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.alumnoService.remove(id);
  }
}
