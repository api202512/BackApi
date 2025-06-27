import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asignacion } from '../schemas/asignacion.schema';
import { AsignacionDto, UpdateAsignacionDto } from '../dtos/asignacion.dtos';

@Injectable()
export class AsignacionService {
  constructor(
    @InjectModel(Asignacion.name) private readonly asignacionModel: Model<Asignacion>,
  ) {}

  async findAll() {
    return this.asignacionModel.find().exec();
  }

  async findOne(id: string) {
    const asignacion = await this.asignacionModel.findById(id).exec();
    if (!asignacion) {
      throw new NotFoundException(`Asignacion con ID ${id} no encontrado`);
    }
    return asignacion;
  }

  async create(payload: AsignacionDto) {
    const newAsignacion = new this.asignacionModel(payload);
    return newAsignacion.save();
  }

  async update(id: string, payload: UpdateAsignacionDto) {
    const asignacion = await this.asignacionModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!asignacion) {
      throw new NotFoundException(`Asignacion con ID ${id} no encontrado`);
    }
    return asignacion;
  }

  async remove(id: string) {
    const asignacion = await this.asignacionModel.findByIdAndDelete(id).exec();
    if (!asignacion) {
      throw new NotFoundException(`Asignacion con ID ${id} no encontrado`);
    }
    return true;
  }
}
