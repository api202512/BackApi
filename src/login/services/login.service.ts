import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Login } from '../schemas/login.schema';
import { RegistroDto } from './../dtos/registro.dtos';

@Injectable()
export class LoginService {
  constructor(@InjectModel(Login.name) private userModel: Model<Login>) {}

  async findOne(id: string) {
    const login = await this.userModel.findById(id).exec();
    if (!login) {
      throw new NotFoundException(`Login con ID ${id} no encontrado`);
    }
    return login;
  }

  async crear(dto: RegistroDto): Promise<Login> {
    const hash = bcrypt.hashSync(dto.password, 10);
    const nuevo = new this.userModel({ ...dto, password: hash });
    return nuevo.save();
  }

  async encontrarPorEmail(email: string): Promise<Login | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
