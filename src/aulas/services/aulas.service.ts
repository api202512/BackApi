import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aula } from '../schemas/aulas.schema';
import { AulaDto, UpdateAulaDto } from '../dtos/aulas.dtos';

@Injectable()
export class AulasService {
  constructor(
    @InjectModel(Aula.name) private readonly aulaModel: Model<Aula>,
  ) {}

  async findAll() {
    return this.aulaModel.find().exec();
  }

  async findOne(id: string) {
    const aula = await this.aulaModel.findById(id).exec();
    if (!aula) {
      throw new NotFoundException(`Aula con ID ${id} no encontrada`);
    }
    return aula;
  }

  async create(payload: AulaDto) {
    const newAula = new this.aulaModel(payload);
    return newAula.save();
  }

  async update(id: string, payload: UpdateAulaDto) {
    const aula = await this.aulaModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!aula) {
      throw new NotFoundException(`Aula con ID ${id} no encontrada`);
    }
    return aula;
  }

  async remove(id: string) {
    const aula = await this.aulaModel.findByIdAndDelete(id).exec();
    if (!aula) {
      throw new NotFoundException(`Aula con ID ${id} no encontrada`);
    }
    return true;
  }
}
