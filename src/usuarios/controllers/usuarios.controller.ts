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

import { UsuarioDto, UpdateUsuarioDto } from '../dtos/usuarios.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { UsuarioService } from '../services/usuarios.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  getUsuarios(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.usuarioService.findAll();
  }

  @Get('filter')
  getFilter() {
    return { message: 'yo soy un filtro de usuarios' };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usuarioService.findOne(id);
  }

  @Post()
  create(@Body() payload: UsuarioDto) {
    return this.usuarioService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usuarioService.remove(id);
  }
}
