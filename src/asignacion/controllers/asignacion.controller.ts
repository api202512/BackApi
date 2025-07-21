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

import { AsignacionDto, UpdateAsignacionDto } from '../dtos/asignacion.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { AsignacionService } from '../services/asignacion.service';

@ApiTags('Asignacion')
@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get()
  getUsuarios(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.asignacionService.findAll();
  }

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de asignaciones' };
  }

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.asignacionService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo recurso' })
  @ApiResponse({ status: 201, description: 'Recurso creado exitosamente' })
  @Post()
  create(@Body() payload: AsignacionDto) {
    return this.asignacionService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar un recurso existente' })
  @ApiResponse({
    status: 200,
    description: 'Recurso actualizado correctamente',
  })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAsignacionDto,
  ) {
    return this.asignacionService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar un recurso' })
  @ApiResponse({ status: 200, description: 'Recurso eliminado correctamente' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.asignacionService.remove(id);
  }
}
