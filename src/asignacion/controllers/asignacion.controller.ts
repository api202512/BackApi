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

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @Get()
  getUsuarios(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ) {
    return this.asignacionService.findAll();
  }

  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de asignaciones' };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.asignacionService.findOne(id);
  }

  @Post()
  create(@Body() payload: AsignacionDto) {
    return this.asignacionService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAsignacionDto,
  ) {
    return this.asignacionService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.asignacionService.remove(id);
  }
}
