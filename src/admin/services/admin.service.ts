import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administradores } from './../schemas/admin.schema';
import { AdministradorDto, UpdateAdministradorDto } from './../dtos/admin.dtos';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectModel(Administradores.name)
    private readonly adminModel: Model<Administradores>,
  ) {}

  async findAll() {
    return this.adminModel.find().exec();
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
    }
    return admin;
  }

  async create(payload: AdministradorDto) {
    const newAdmin = new this.adminModel(payload);
    return newAdmin.save();
  }

  async update(id: string, payload: UpdateAdministradorDto) {
    const admin = await this.adminModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!admin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
    }
    return admin;
  }

  async remove(id: string) {
    const admin = await this.adminModel.findByIdAndDelete(id).exec();
    if (!admin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
    }
    return true;
  }
}
