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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Alumno')
@Controller('alumno')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los alumnos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  getAlumnos(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.alumnoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un alumno por su ID' })
  @ApiParam({ name: 'id', description: 'ID del alumno' })
  @ApiResponse({ status: 200, description: 'Alumno obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Alumno no encontrado' })
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.alumnoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo alumno' })
  @ApiBody({ type: AlumnoDto })
  @ApiResponse({ status: 201, description: 'Alumno creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() payload: AlumnoDto) {
    return this.alumnoService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un alumno por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del alumno a actualizar',
    example: '686ae8aec1345367edadeb48',
  })
  @ApiResponse({ status: 200, description: 'Alumno actualizado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAlumnoDto,
  ) {
    return this.alumnoService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un alumno por su ID' })
  @ApiParam({ name: 'id', description: 'ID del alumno a eliminar' })
  @ApiBody({
    description: 'Eliminar un alumno',
    examples: {
      ejemplo: {
        summary: 'Ejemplo de eliminacion',
        value: {
          usuarioId: '64abc123',
          generacionId: '64def456',
          modalidad: 'presencial',
          grupo: 'A',
          estatus: 'ACTIVO',
          promedioGeneral: 9.2,
          creditosAcumulados: 180,
          fechaIngreso: '2021-08-01',
          fechaEgreso: '2024-06-30',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Alumno eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Alumno no encontrado' })
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.alumnoService.remove(id);
  }
}
