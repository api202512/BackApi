import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Login } from '../schemas/login.schema';
import { RegistroDto } from './../dtos/registro.dtos';
import { RegistroAdminDto } from './../dtos/registroadmin.dtos';

@Injectable()
export class LoginService {
  constructor(@InjectModel(Login.name) private userModel: Model<Login>) {}

  async findOne(id: string) {
    const login = await this.userModel.findById(id).exec();
    if (!login) {
      throw new BadRequestException(`Login con ID ${id} no encontrado`);
    }
    return login;
  }

  async buscarPorEmail(email: string): Promise<Login | null> {
    return this.userModel.findOne({ email }).select('+rol');
  }

  async validarUsuario(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return {
      _id: user._id,
      email: user.email,
      rol: user.rol,
    };
  }

  async crear(dto: RegistroDto): Promise<Login> {
    const hash = bcrypt.hashSync(dto.password, 10);
    const nuevo = new this.userModel({
      nombre: dto.nombre,
      email: dto.email,
      password: hash,
      rol: 'usuario',
    });

    try {
      const guardar = await nuevo.save();
      return guardar;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Ya existe un usuario con ese correo.');
      }
      throw error;
    }
  }

  async crearAdminSiNoExiste(dto: RegistroAdminDto): Promise<Login> {
    console.log('DTO recibido:', dto);
    const claveCorrecta = process.env.CLAVE_ADMIN || 'MiClaveSecretaSegura123';

    if (dto.claveSecreta !== claveCorrecta) {
      throw new BadRequestException('Clave secreta incorrecta');
    }

    const existe = await this.userModel.findOne({ email: dto.email });
    if (existe) {
      throw new BadRequestException('Ya existe un usuario con ese correo.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const nuevoUsuario = new this.userModel({
      nombre: dto.nombre,
      email: dto.email,
      password: hashedPassword,
      rol: 'admin',
      claveSecreta: dto.claveSecreta,
    });

    try {
      const guardado = await nuevoUsuario.save();
      return guardado;
    } catch (error) {
      console.error('❌ Error al guardar el admin:', error);
      throw new BadRequestException('Error al guardar el admin.');
    }
  }
}
