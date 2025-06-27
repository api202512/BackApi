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

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docenteService: DocentesService) {}

  @Get()
  getDocentes(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ) {
    return this.docenteService.findAll();
  }
  
  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de docentes' };
  }
  
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.docenteService.findOne(id);
  }
  
  @Post()
  create(@Body() payload: DocenteDto) {
    return this.docenteService.create(payload);
  }
  
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateDocenteDto,
  ) {
    return this.docenteService.update(id, payload);
  }
  
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.docenteService.remove(id);
  }
}