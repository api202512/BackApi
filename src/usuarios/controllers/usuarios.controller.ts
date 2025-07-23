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

import { UsuarioDto, UpdateUsuarioDto } from '../dtos/usuarios.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { UsuarioService } from '../services/usuarios.service';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get()
  getUsuarios(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.usuarioService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usuarioService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: UsuarioDto })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  create(@Body() payload: UsuarioDto) {
    return this.usuarioService.create(payload);
  }

  @ApiOperation({ summary: 'Actualizar un usuario por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a actualizar',
    example: '686ae5d43705b69e05f1cb4e',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar un usuario por su ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar' })
  @ApiBody({
    description: 'Eliminar un alumno',
    examples: {
      ejemplo: {
        summary: 'Ejemplo de eliminacion',
        value: {
          nombreCompleto: 'yvgubhj',
          matricula: 'fdfsc',
          correo: 'yfvgbhn@example.com',
          contraseña: 'r23ryfwef',
          rol: 'ALUMNO',
          activo: true,
          preguntaSeguridad: 'wefewf',
          respuestaSeguridad: 'wfefw',
          telefono: '1231431413',
          fechaNacimiento: '2001-06-11T00:00:00.000+00:00',
          direccion: {
            calle: 'wf23',
            ciudad: 'wfee',
            estado: 'fwf',
            codigoPostal: '32342',
          },
          avatar: '1232423dw',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usuarioService.remove(id);
  }
}
