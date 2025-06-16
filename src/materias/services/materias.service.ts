import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Materia } from '../schemas/materias.schema';
import { MateriaDto, UpdateMateriaDto } from '../dtos/materias.dtos';

@Injectable()
export class MateriasService {
  constructor(
    @InjectModel(Materia.name) private readonly materiaModel: Model<Materia>,
  ) {}

  async findAll() {
    return this.materiaModel.find().exec();
  }

  async findOne(id: string) {
    const materia = await this.materiaModel.findById(id).exec();
    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }
    return materia;
  }

  async create(payload: MateriaDto) {
    const newMateria = new this.materiaModel(payload);
    return newMateria.save();
  }

  async update(id: string, payload: UpdateMateriaDto) {
    const materia = await this.materiaModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }
    return materia;
  }

  async remove(id: string) {
    const materia = await this.materiaModel.findByIdAndDelete(id).exec();
    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }
    return true;
  }
}
