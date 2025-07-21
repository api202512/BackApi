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
  CicloEscolarDto,
  UpdateCicloEscolarDto,
} from '../dtos/ciclo_escolar.dtos';
import { CicloEscolarService } from '../services/ciclo_escolar.service';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';

@ApiTags('Ciclo_Escolar')
@Controller('ciclo-escolar')
export class CicloEscolarController {
  constructor(private readonly cicloEscolarService: CicloEscolarService) {}
  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get()
  getCicloEscolar(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.cicloEscolarService.findAll();
  }

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de aulas' };
  }

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.cicloEscolarService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo recurso' })
  @ApiResponse({ status: 201, description: 'Recurso creado exitosamente' })
  @Post()
  create(@Body() payload: CicloEscolarDto) {
    return this.cicloEscolarService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar un recurso existente' })
  @ApiResponse({
    status: 200,
    description: 'Recurso actualizado correctamente',
  })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateCicloEscolarDto,
  ) {
    return this.cicloEscolarService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar un recurso' })
  @ApiResponse({ status: 200, description: 'Recurso eliminado correctamente' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.cicloEscolarService.remove(id);
  }
}
