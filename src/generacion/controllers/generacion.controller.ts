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

import { GeneracionDto, UpdateGeneracionDto } from '../dtos/generacion.dtos';
import { ParseMongoIdPipe } from '../../common/parse-mongo-id/parse-mongo-id.pipe';
import { GeneracionService } from '../services/generacion.service';

@ApiTags('Generacion')
@Controller('generacion')
export class GeneracionController {
  constructor(private readonly generacionService: GeneracionService) {}

  @ApiOperation({ summary: 'Obtener todas las generaciones' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get()
  getGeneraciones(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.generacionService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una generacion por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la generacion' })
  @ApiResponse({
    status: 200,
    description: 'Generacion obtenido correctamente',
  })
  @ApiResponse({ status: 404, description: 'Generacion no encontrado' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.generacionService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear una nueva generacion' })
  @ApiBody({ type: GeneracionDto })
  @ApiResponse({ status: 201, description: 'Generacion creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  create(@Body() payload: GeneracionDto) {
    return this.generacionService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar una generacion por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la generacion a actualizar',
    example: '686ae75f15a92f4fb9c30653',
  })
  @ApiResponse({
    status: 200,
    description: 'Generacion actualizado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateGeneracionDto,
  ) {
    return this.generacionService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar una generacion por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la generacion a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'Generacion eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Generacion no encontrado' })
  @ApiBody({
    description: 'Eliminar una generacion',
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
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.generacionService.remove(id);
  }
}
