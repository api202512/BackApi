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

@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}
  @Get()
  getAulas(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.aulasService.findAll();
  }

  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de aulas' };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.aulasService.findOne(id);
  }

  @Post()
  create(@Body() payload: AulaDto) {
    return this.aulasService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAulaDto,
  ) {
    return this.aulasService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.aulasService.remove(id);
  }
}
