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

import { AsignacionDto, UpdateAsignacionDto } from '../dtos/asignacion.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { AsignacionService } from '../services/asignacion.service';

@ApiTags('Asignacion')
@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @ApiOperation({ summary: 'Obtener las asignaciones' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get()
  getUsuarios(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.asignacionService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una asignacion por su ID' })
  @ApiParam({ name: 'id', description: 'ID de asignacion' })
  @ApiResponse({
    status: 200,
    description: 'Asignacion obtenido correctamente',
  })
  @ApiResponse({ status: 404, description: 'Asignacion no encontrado' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.asignacionService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear una nueva asignacion por su ID' })
  @ApiBody({ type: AsignacionDto })
  @ApiResponse({ status: 201, description: 'Asignacion creado exitosamente' })
  @ApiResponse({ status: 404, description: 'Datos inválidos' })
  @Post()
  create(@Body() payload: AsignacionDto) {
    return this.asignacionService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar una asignacion por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de asignacion a actualizar',
    example: '686aeb58ba779ddc4b6f4b3e',
  })
  @ApiResponse({
    status: 200,
    description: 'Asignacion actualizado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Datos inválidos' })
  @ApiBody({
    type: UpdateAsignacionDto,
    examples: {
      ejemplo: {
        value: {
          docenteId: '64aabbccddee',
          materiaId: '64bbccddeeff',
          aulaId: '64ccddeeffaa',
        },
      },
    },
  })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAsignacionDto,
  ) {
    return this.asignacionService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar una asignacion por su ID' })
  @ApiParam({ name: 'id', description: 'ID de asignacion a eliminar' })
  @ApiBody({
    description: 'Eliminar una asignacion',
    examples: {
      ejemplo: {
        summary: 'Ejemplo de eliminacion',
        value: {
          docenteId: '686aeb0bba779ddc4b6f4b3c',
          materiaId: '686ae83ac1345367edadeb46',
          aulaId: '686ae6c8559fa32d21f4607c',
          cicloEscolarId: '686ae812c1345367edadeb3e',
          grupo: 'B',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Asignacion eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Asignacion no encontrado' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.asignacionService.remove(id);
  }
}
