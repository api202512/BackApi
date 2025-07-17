import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '../schemas/usuarios.schema';
import { UsuarioDto, UpdateUsuarioDto } from '../dtos/usuarios.dtos';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}

  async findAll() {
    return this.usuarioModel.find().exec();
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
  return this.usuarioModel.findOne({ email });
}


  async findOne(id: string) {
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async create(payload: UsuarioDto) {
    const newUsuario = new this.usuarioModel(payload);
    return newUsuario.save();
  }

  async update(id: string, payload: UpdateUsuarioDto) {
    const usuario = await this.usuarioModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async remove(id: string) {
    const usuario = await this.usuarioModel.findByIdAndDelete(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return true;
  }
}
