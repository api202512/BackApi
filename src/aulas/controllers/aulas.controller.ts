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
import { AulaDto, UpdateAulaDto } from '../dtos/aulas.dtos';
import { AulasService } from '../services/aulas.service';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';

@ApiTags('Aulas')
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}
  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get()
  getAulas(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.aulasService.findAll();
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
    return this.aulasService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo recurso' })
  @ApiResponse({ status: 201, description: 'Recurso creado exitosamente' })
  @Post()
  create(@Body() payload: AulaDto) {
    return this.aulasService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar un recurso existente' })
  @ApiResponse({
    status: 200,
    description: 'Recurso actualizado correctamente',
  })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAulaDto,
  ) {
    return this.aulasService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar un recurso' })
  @ApiResponse({ status: 200, description: 'Recurso eliminado correctamente' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.aulasService.remove(id);
  }
}
