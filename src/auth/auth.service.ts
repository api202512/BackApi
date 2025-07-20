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

  async login(usuario: any) {
    const payload = {
      userId: usuario.userId,  // 👈 Asegúrate que este `_id` venga del mismo modelo referenciado en ApiKey
      email: usuario.email,
      rol: usuario.rol
    };

    return {
      token: this.jwtService.sign(payload),
      usuario, // esto es opcional para frontend
    };
  }
}