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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegistroAdminDto } from '../dtos/registroadmin.dtos';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(
    private authService: AuthService,
    private loginService: LoginService,
  ) {}

  @ApiOperation({ summary: 'Crear un nuevo registro' })
  @ApiResponse({ status: 201, description: 'Registro creado exitosamente' })
  @Post('registro')
  async registrar(@Body() dto: RegistroDto) {
    const existe = await this.loginService.buscarPorEmail(dto.email);
    if (existe) throw new BadRequestException('El correo ya está registrado');
    return this.loginService.crear(dto);
  }

  @ApiOperation({ summary: 'Iniciar Sesion' })
  @ApiResponse({ status: 201, description: 'Inicio de sesion exitosamente' })
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
  @ApiResponse({ status: 201, description: 'Admin creado exitosamente' })
  @Post('crear-admin')
  async crearAdmin(@Body() dto: RegistroAdminDto) {
    const existe = await this.loginService.buscarPorEmail(dto.email);
    if (existe) throw new BadRequestException('El correo ya está registrado');
    return this.loginService.crearAdminSiNoExiste(dto);
  }

  @ApiOperation({ summary: 'Obtener datos por el id' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.loginService.findOne(id);
  }
}
