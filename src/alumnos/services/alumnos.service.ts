import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alumno } from '../schemas/alumnos.schema';
import { AlumnoDto, UpdateAlumnoDto } from '../dtos/alumnos.dtos';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectModel(Alumno.name) private readonly alumnoModel: Model<Alumno>,
  ) {}

  async findAll() {
    return this.alumnoModel.find().exec();
  }

  async findOne(id: string) {
    const alumnos = await this.alumnoModel.findById(id).exec();
    if (!alumnos) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    }
    return alumnos;
  }

  async create(payload: AlumnoDto) {
    const newAlumno = new this.alumnoModel(payload);
    return newAlumno.save();
  }

  async update(id: string, payload: UpdateAlumnoDto) {
    const alumno = await this.alumnoModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    }
    return alumno;
  }

  async remove(id: string) {
    const alumno = await this.alumnoModel.findByIdAndDelete(id).exec();
    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    }
    return true;
  }
}
