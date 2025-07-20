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
import { AdministradorDto, UpdateAdministradorDto } from './../dtos/admin.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { AdministradorService } from './../services/admin.service';

@Controller('administrador')
export class AdministradorController {
  constructor(private readonly adminService: AdministradorService) {}

  @Get()
  getAdmin(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.adminService.findAll();
  }

  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de usuarios' };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.adminService.findOne(id);
  }

  @Post()
  create(@Body() payload: AdministradorDto) {
    return this.adminService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAdministradorDto,
  ) {
    return this.adminService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.adminService.remove(id);
  }
}
