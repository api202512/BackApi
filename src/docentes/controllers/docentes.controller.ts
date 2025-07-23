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
import { DocentesService } from '../services/docentes.service';
import { DocenteDto, UpdateDocenteDto } from '../dtos/docentes.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';

@ApiTags('Docentes')
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docenteService: DocentesService) {}

  @ApiOperation({ summary: 'Obtener todos datos docentes' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get()
  getDocentes(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.docenteService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un docente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  @ApiResponse({ status: 200, description: 'Docente obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Docente no encontrado' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.docenteService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo docente' })
  @ApiBody({ type: DocenteDto })
  @ApiResponse({ status: 201, description: 'Docente creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  create(@Body() payload: DocenteDto) {
    return this.docenteService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar un docente por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del docente a actualizar',
    example: '686ae8aec1345367edadeb48',
  })
  @ApiResponse({
    status: 200,
    description: 'Docente actualizado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateDocenteDto,
  ) {
    return this.docenteService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar un docente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del docente a eliminar' })
  @ApiBody({
    description: 'Eliminar un alumno',
    examples: {
      ejemplo: {
        summary: 'Ejemplo de eliminacion',
        value: {
          usuarioId: '686aea35940becc19b8cd88b',
          especialidad: 'efvev',
          titulo: 'ceec',
          experienciaAnio: '4',
          fechaIngreso: '2001-06-11T00:00:00.000+00:00',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Docente eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Docente no encontrado' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.docenteService.remove(id);
  }
}
