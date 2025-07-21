import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get()
  getInscripciones(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.inscripcionService.findAll();
  }

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de inscripciones' };
  }

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.inscripcionService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo recurso' })
  @ApiResponse({ status: 201, description: 'Recurso creado exitosamente' })
  @Post()
  create(@Body() payload: InscripcionDto) {
    return this.inscripcionService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar un recurso existente' })
  @ApiResponse({
    status: 200,
    description: 'Recurso actualizado correctamente',
  })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateInscripcionDto,
  ) {
    return this.inscripcionService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar un recurso' })
  @ApiResponse({ status: 200, description: 'Recurso eliminado correctamente' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.inscripcionService.remove(id);
  }
}
