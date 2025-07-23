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

import { MateriaDto, UpdateMateriaDto } from '../dtos/materias.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { MateriasService } from '../services/materias.service';

@ApiTags('Materias')
@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @ApiOperation({ summary: 'Obtener todos las materias' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get()
  getMaterias(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.materiasService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un materia por su ID' })
  @ApiParam({ name: 'id', description: 'ID del materia' })
  @ApiResponse({ status: 200, description: 'Materia obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Materia no encontrado' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.materiasService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo materia' })
  @ApiBody({ type: MateriaDto })
  @ApiResponse({ status: 201, description: 'Materia creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  create(@Body() payload: MateriaDto) {
    return this.materiasService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar un materia por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del materia a actualizar',
    example: '686ae83ac1345367edadeb46',
  })
  @ApiResponse({
    status: 200,
    description: 'Materia actualizado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateMateriaDto,
  ) {
    return this.materiasService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar un materia por su ID' })
  @ApiParam({ name: 'id', description: 'ID del materia a eliminar' })
  @ApiBody({
    type: UpdateMateriaDto,
    examples: {
      ejemplo: {
        value: {
          nombre: 'estructuras de datos',
          clave: 'IANC33F',
          descripcion: 'dcecres',
          cuatrimestre: '3',
          creditos: '4',
          horasTeoricas: '19',
          horasPracticas: '32',
          activa: true,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Materia eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Materia no encontrado' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.materiasService.remove(id);
  }
}
