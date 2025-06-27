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
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { GeneracionService } from '../services/generaciones.service';

@Controller('generacion')
export class GeneracionController {
  constructor(private readonly generacionService: GeneracionService) {}

  @Get()
  getGeneraciones(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ) {
    return this.generacionService.findAll();
  }

  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de generaciones' };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.generacionService.findOne(id);
  }

  @Post()
  create(@Body() payload: GeneracionDto) {
    return this.generacionService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateGeneracionDto,
  ) {
    return this.generacionService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.generacionService.remove(id);
  }
}
