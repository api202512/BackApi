import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../usuarios/services/usuarios.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, password: string) {
    const usuario = await this.usuariosService.buscarPorEmail(email);
    if (usuario && bcrypt.compareSync(password, usuario.contraseña)) {
      return usuario;
    }
    return null;
  }

  async login(usuario: any) {
    const payload = { email: usuario.email, sub: usuario._id, rol: usuario.rol };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
