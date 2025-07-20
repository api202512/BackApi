import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inscripcion } from '../schemas/inscripcion.schema';
import {
  InscripcionDto,
  UpdateInscripcionDto,
} from '../dtos/inscripciones.dtos';

@Injectable()
export class InscripcionService {
  constructor(
    @InjectModel(Inscripcion.name)
    private readonly inscripcionModel: Model<Inscripcion>,
  ) {}

  async findAll() {
    return this.inscripcionModel.find().exec();
  }

  async findOne(id: string) {
    const inscripcion = await this.inscripcionModel.findById(id).exec();
    if (!inscripcion) {
      throw new NotFoundException(`Inscripcion con ID ${id} no encontrado`);
    }
    return inscripcion;
  }

  async create(payload: InscripcionDto) {
    const newInscripcion = new this.inscripcionModel(payload);
    return newInscripcion.save();
  }

  async update(id: string, payload: UpdateInscripcionDto) {
    const inscripcion = await this.inscripcionModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!inscripcion) {
      throw new NotFoundException(`Inscripcion con ID ${id} no encontrado`);
    }
    return inscripcion;
  }

  async remove(id: string) {
    const inscripcion = await this.inscripcionModel
      .findByIdAndDelete(id)
      .exec();
    if (!inscripcion) {
      throw new NotFoundException(`Inscripcion con ID ${id} no encontrado`);
    }
    return true;
  }
}
