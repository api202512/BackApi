import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from './../dtos/login.dtos';
import { AuthService } from './../../auth/auth.service';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { RegistroDto } from '../dtos/registro.dtos';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { RegistroAdminDto } from '../dtos/registroadmin.dtos';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(
    private authService: AuthService,
    private loginService: LoginService,
  ) {}

  @ApiOperation({ summary: 'Crear un nuevo registro' })
  @ApiBody({ type: RegistroDto })
  @ApiResponse({ status: 201, description: 'Registro creado correctamente' })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o correo registrado',
  })
  @Post('registro')
  async registrar(@Body() dto: RegistroDto) {
    const existe = await this.loginService.buscarPorEmail(dto.email);
    if (existe) throw new BadRequestException('El correo ya está registrado');
    return this.loginService.crear(dto);
  }

  @ApiOperation({ summary: 'Iniciar Sesion' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Inicio de sesion exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validarUsuario(
      body.email,
      body.password,
    );
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Crear admin' })
  @ApiBody({ type: RegistroAdminDto })
  @ApiResponse({ status: 201, description: 'Admin creado exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o correo registrado',
  })
  @Post('crear-admin')
  async crearAdmin(@Body() dto: RegistroAdminDto) {
    const existe = await this.loginService.buscarPorEmail(dto.email);
    if (existe) throw new BadRequestException('El correo ya está registrado');
    return this.loginService.crearAdminSiNoExiste(dto);
  }

  @ApiOperation({ summary: 'Obtener un usuarioFront por su ID' })
  @ApiParam({ name: 'id', description: 'ID del usuarioFront' })
  @ApiResponse({
    status: 200,
    description: 'usuarioFront obtenido correctamente',
  })
  @ApiResponse({ status: 404, description: 'usuarioFront no encontrado' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.loginService.findOne(id);
  }
}
