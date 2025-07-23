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
import { AulaDto, UpdateAulaDto } from '../dtos/aulas.dtos';
import { AulasService } from '../services/aulas.service';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';

@ApiTags('Aulas')
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}
  @ApiOperation({ summary: 'Obtener todas las aulas' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get()
  getAulas(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.aulasService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una aula por su ID' })
  @ApiResponse({ status: 200, description: 'Aula obtenida correctamente' })
  @ApiResponse({ status: 404, description: 'Aula no encontrado' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.aulasService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear una nueva aula' })
  @ApiBody({ type: AulaDto })
  @ApiResponse({ status: 201, description: 'Aula creado exitosamente' })
  @ApiResponse({ status: 404, description: 'Datos inválidos' })
  @Post()
  create(@Body() payload: AulaDto) {
    return this.aulasService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar una aula por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la aula a actualizar',
    example: '686ae6c8559fa32d21f4607c',
  })
  @ApiResponse({ status: 200, description: 'Aula actualizado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAulaDto,
  ) {
    return this.aulasService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar una aula por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la aula a eliminar' })
  @ApiBody({
    description: 'Eliminar una aula',
    examples: {
      ejemplo: {
        summary: 'Ejemplo de eliminacion',
        value: {
          nombre: 'L3',
          ubicacion: 'Edificio D',
          capacidad: '23',
          tipo: 'LABORATORIO',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Aula eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Aula no encontrado' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.aulasService.remove(id);
  }
}
