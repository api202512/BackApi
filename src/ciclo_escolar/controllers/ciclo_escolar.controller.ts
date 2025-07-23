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
  CicloEscolarDto,
  UpdateCicloEscolarDto,
} from '../dtos/ciclo_escolar.dtos';
import { CicloEscolarService } from '../services/ciclo_escolar.service';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';

@ApiTags('Ciclo_Escolar')
@Controller('ciclo-escolar')
export class CicloEscolarController {
  constructor(private readonly cicloEscolarService: CicloEscolarService) {}

  @ApiOperation({ summary: 'Obtener todas los ciclos escolares' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get()
  getCicloEscolar(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.cicloEscolarService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un ciclo escolar por su ID' })
  @ApiParam({ name: 'id', description: 'ID del ciclo escolar' })
  @ApiResponse({
    status: 200,
    description: 'Ciclo escolar obtenido correctamente',
  })
  @ApiResponse({ status: 404, description: 'Ciclo escolar no encontrado' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.cicloEscolarService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo ciclo escolar' })
  @ApiBody({ type: CicloEscolarDto })
  @ApiResponse({
    status: 201,
    description: 'Ciclo escolar creado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  create(@Body() payload: CicloEscolarDto) {
    return this.cicloEscolarService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar un ciclo escolar por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del ciclo escolar a actualizar',
    example: '686ae812c1345367edadeb3e',
  })
  @ApiResponse({
    status: 200,
    description: 'Ciclo escolar actualizado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Datos inválidos' })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateCicloEscolarDto,
  ) {
    return this.cicloEscolarService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar un ciclo escolar por su ID' })
  @ApiParam({ name: 'id', description: 'ID del ciclo escolar a eliminar' })
  @ApiBody({
    description: 'Eliminar un alumno',
    type: UpdateCicloEscolarDto,
    examples: {
      ejemplo: {
        summary: 'Ejemplo de eliminacion',
        value: {
          nombre: '2023-2024',
          fechaInicio: '2001-06-11T00:00:00.000+00:00',
          fechaFin: '2001-06-11T00:00:00.000+00:00',
          activo: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Ciclo escolar eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Ciclo escolar no encontrado' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.cicloEscolarService.remove(id);
  }
}
