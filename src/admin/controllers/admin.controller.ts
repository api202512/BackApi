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
import { AdministradorDto, UpdateAdministradorDto } from './../dtos/admin.dtos';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { AdministradorService } from './../services/admin.service';

@ApiTags('Admin')
@Controller('administrador')
export class AdministradorController {
  constructor(private readonly adminService: AdministradorService) {}

  @ApiOperation({ summary: 'Obtener todos los admin' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get()
  getAdmin(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un admin por su ID' })
  @ApiParam({ name: 'id', description: 'ID de admin' })
  @ApiResponse({ status: 200, description: 'Admin encontrado' })
  @ApiResponse({ status: 404, description: 'Admin no encontrado' })
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.adminService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo admin' })
  @ApiBody({ type: AdministradorDto })
  @ApiResponse({ status: 201, description: 'Admin creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() payload: AdministradorDto) {
    return this.adminService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un admin por su ID' })
  @ApiParam({ name: 'id', description: 'ID del alumno a actualizar' })
  @ApiResponse({
    status: 200,
    description: 'Admin actualizado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Datos inválidos' })
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() payload: UpdateAdministradorDto,
  ) {
    return this.adminService.update(id, payload);
  }

  @ApiOperation({ summary: 'Eliminar un admin por su ID' })
  @ApiBody({
    description: 'Eliminar un admin',
    examples: {
      ejemplo: {
        summary: 'Ejemplo de eliminacion',
        value: {
          nombre: 'Carlos Pérez',
          correo: 'admin@uthh.edu.mx',
          contraseña: '******',
          rol: 'admin',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Admin eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Admin no encontrado' })
  @Delete(':id')
  delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.adminService.remove(id);
  }
}
