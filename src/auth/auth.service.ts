import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from './../login/services/login.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private loginService: LoginService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, password: string) {
    const usuario = await this.loginService.buscarPorEmail(email);
    if (usuario && bcrypt.compareSync(password, usuario.password)) {
      return usuario;
    }
    return null;
  }

  async login(user: any) {
    const userId = user._id?.toString?.() ?? user.id?.toString?.();

    const payload = {
      userId,
      email: user.email,
      rol: user.rol,
    };

    const token = this.jwtService.sign(payload);

    return {
      token, // 👈 esto debe estar presente
      usuario: {
        userId,
        email: user.email,
        rol: user.rol
      }
    };
  }
}