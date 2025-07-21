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
import { DocentesService } from '../services/docentes.service';
import { DocenteDto, UpdateDocenteDto } from '../dtos/docentes.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';

@ApiTags('Docentes')
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docenteService: DocentesService) {}

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get()
  getDocentes(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.docenteService.findAll();
  }

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de docentes' };
  }

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.docenteService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo recurso' })
  @ApiResponse({ status: 201, description: 'Recurso creado exitosamente' })
  @Post()
  create(@Body() payload: DocenteDto) {
    return this.docenteService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar un recurso existente' })
  @ApiResponse({
    status: 200,
    description: 'Recurso actualizado correctamente',
  })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateDocenteDto,
  ) {
    return this.docenteService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar un recurso' })
  @ApiResponse({ status: 200, description: 'Recurso eliminado correctamente' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.docenteService.remove(id);
  }
}
