import { JwtService } from '@nestjs/jwt';
import { Res, Body, Controller, Post } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ApiKeyService } from '../api-key/services/api-key.service';
import { LoginDto } from './../login/dtos/login.dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { email, password } = loginDto;
    const user = await this.authService.validarUsuario(email, password);

    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = this.jwtService.sign({ sub: user.email, rol: user.rol });

    const apiKey = await this.apiKeyService.validarClave(user.email);

    return res.status(200).json({ token, apiKey });
  }
}
