import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CicloEscolar } from '../schemas/ciclo_escolar.schema';
import {
  CicloEscolarDto,
  UpdateCicloEscolarDto,
} from '../dtos/ciclo_escolar.dtos';

@Injectable()
export class CicloEscolarService {
  constructor(
    @InjectModel(CicloEscolar.name)
    private readonly cicloEscolarModel: Model<CicloEscolar>,
  ) {}

  async findAll() {
    return this.cicloEscolarModel.find().exec();
  }

  async findOne(id: string) {
    const cicloEscolar = await this.cicloEscolarModel.findById(id).exec();
    if (!cicloEscolar) {
      throw new NotFoundException(`Ciclo Escolar con ID ${id} no encontrado`);
    }
    return cicloEscolar;
  }

  async create(payload: CicloEscolarDto) {
    const newCicloEscolar = new this.cicloEscolarModel(payload);
    return newCicloEscolar.save();
  }

  async update(id: string, payload: UpdateCicloEscolarDto) {
    const cicloEscolar = await this.cicloEscolarModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!cicloEscolar) {
      throw new NotFoundException(`Ciclo Escolar con ID ${id} no encontrado`);
    }
    return cicloEscolar;
  }

  async remove(id: string) {
    const cicloEscolar = await this.cicloEscolarModel
      .findByIdAndDelete(id)
      .exec();
    if (!cicloEscolar) {
      throw new NotFoundException(`Ciclo Escolar con ID ${id} no encontrado`);
    }
    return true;
  }
}
