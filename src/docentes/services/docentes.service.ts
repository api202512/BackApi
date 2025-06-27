import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Docentes } from '../schemas/docentes.schema';
import { DocenteDto, UpdateDocenteDto } from '../dtos/docentes.dtos';

@Injectable()
export class DocentesService {
  constructor(
    @InjectModel(Docentes.name) private readonly docenteModel: Model<Docentes>,
  ) {}
  
  async findAll() {
    return this.docenteModel.find().exec();
  }
  
  async findOne(id: string) {
    const docente = await this.docenteModel.findById(id).exec();
    if (!docente) {
      throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    }
    return docente;
  }

  async create(payload: DocenteDto) {
    const newDocente = new this.docenteModel(payload);
    return newDocente.save();
  }

  async update(id: string, payload: UpdateDocenteDto) {
    const docente = await this.docenteModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!docente) {
      throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    }
    return docente;
  }
  
  async remove(id: string) {
    const docente = await this.docenteModel.findByIdAndDelete(id).exec();
    if (!docente) {
      throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    }
    return true;
  }
}