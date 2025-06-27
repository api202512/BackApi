import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Generacion } from '../schemas/generacion.schema';
import { GeneracionDto, UpdateGeneracionDto } from '../dtos/generacion.dtos';

@Injectable()
export class GeneracionService {
  constructor(
    @InjectModel(Generacion.name) private readonly generacionModel: Model<Generacion>,
  ) {}

  async findAll() {
    return this.generacionModel.find().exec();
  }

  async findOne(id: string) {
    const generacion = await this.generacionModel.findById(id).exec();
    if (!generacion) {
      throw new NotFoundException(`Generacion con ID ${id} no encontrado`);
    }
    return generacion;
  }

  async create(payload: GeneracionDto) {
    const newGeneracion = new this.generacionModel(payload);
    return newGeneracion.save();
  }

  async update(id: string, payload: UpdateGeneracionDto) {
    const generacion = await this.generacionModel   
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!generacion) {
      throw new NotFoundException(`Generacion con ID ${id} no encontrado`);
    }
    return generacion;
  }

  async remove(id: string) {
    const generacion = await this.generacionModel.findByIdAndDelete(id).exec();
    if (!generacion) {
      throw new NotFoundException(`Generacion con ID ${id} no encontrado`);
    }
    return true;
  }
}
