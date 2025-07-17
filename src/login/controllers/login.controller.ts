import { 
  Controller, 
  Post, 
  Body, 
  BadRequestException, 
  UnauthorizedException,
  Get,
  HttpCode,
  HttpStatus,
  Param
} from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from './../dtos/login.dtos';
import { AuthService } from './../../auth/auth.service';
import { ParseMongoIdPipe } from './../../common/parse-mongo-id/parse-mongo-id.pipe';
import { RegistroDto } from '../dtos/registro.dtos';

@Controller('login')
export class LoginController {
  constructor(
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  @Post('registro')
  async registrar(@Body() dto: RegistroDto) {
    const existe = await this.loginService.encontrarPorEmail(dto.email);
    if (existe) throw new BadRequestException('El correo ya está registrado');
    return this.loginService.crear(dto);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validarUsuario(body.email, body.password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return this.authService.login(user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.loginService.findOne(id);
  }
}
