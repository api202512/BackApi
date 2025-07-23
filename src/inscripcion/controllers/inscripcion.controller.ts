import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
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

@ApiTags('Inscripcion')
@Controller('inscripciones')
export class InscripcionController {
  constructor(private readonly inscripcionService: InscripcionService) {}

  @ApiOperation({ summary: 'Obtener todas las inscripciones' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get()
  getInscripciones(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.inscripcionService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una inscripcion por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la inscripcion' })
  @ApiResponse({
    status: 200,
    description: 'Incripcion obtenido correctamente',
  })
  @ApiResponse({ status: 404, description: 'Inscripcion no encontrado' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.inscripcionService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear una nueva inscripcion' })
  @ApiBody({ type: InscripcionDto })
  @ApiResponse({ status: 201, description: 'Inscripcion creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  create(@Body() payload: InscripcionDto) {
    return this.inscripcionService.create(payload);
  }

  @ApiParam({
    name: 'id',
    description: 'ID de la inscripción a actualizar',
    example: '687f1d1f58ff6e4acdcbd487',
  })
  @ApiOperation({ summary: 'Actualizar una inscripcion por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Inscripcion actualizado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateInscripcionDto,
  ) {
    return this.inscripcionService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar una inscripcion por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la inscripcion a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'Incripcion eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Incripcion no encontrado' })
  @ApiBody({
    description: 'Eliminar una inscripción',
    examples: {
      ejemplo1: {
        summary: 'Ejemplo de eliminacion',
        value: {
          alumnoId: '64f1fbc8a33b9f0011a233bb',
          materiaId: '64f1fc28a33b9f0011a233bc',
          calificacion: 9.5,
          estatus: 'APROBADO',
        },
      },
    },
  })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.inscripcionService.remove(id);
  }
}
