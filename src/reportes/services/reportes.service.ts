import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Alumno } from './../../alumnos/schemas/alumnos.schema';
import { Materia } from './../../materias/schemas/materias.schema';
import { Docentes } from './../../docentes/schemas/docentes.schema';
import { Inscripcion } from './../../inscripcion/schemas/inscripcion.schema';

@Injectable()
export class ReportesService {
  constructor(
    @InjectModel(Alumno.name) private alumnoModel: Model<Alumno>,
    @InjectModel(Materia.name) private materiaModel: Model<Materia>,
    @InjectModel(Docentes.name) private docenteModel: Model<Docentes>,
    @InjectModel(Inscripcion.name) private inscripcionModel: Model<Inscripcion>,
  ) {}

  async reporteMateriasPorAlumno(alumnoId: string) {
    if (!Types.ObjectId.isValid(alumnoId)) {
      throw new BadRequestException('ID de alumno inválido');
    }

    return this.inscripcionModel.aggregate([
      {
        $match: {
          alumnoId: alumnoId,
        },
      },
      {
        $lookup: {
          from: 'materias',
          let: { materiaId: '$asignacionMateriaId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', { $toObjectId: '$$materiaId' }],
                },
              },
            },
          ],
          as: 'materia',
        },
      },
      {
        $unwind: '$materia',
      },
      {
        $project: {
          nombreMateria: '$materia.nombre',
          calificacion: 1,
          estatus: 1,
          intentos: 1,
          observaciones: 1,
        },
      },
    ]);
  }

  async reporteMateriasPorDocente(docenteId: string) {
    if (!Types.ObjectId.isValid(docenteId)) {
      throw new BadRequestException('ID de docente inválido');
    }

    return this.inscripcionModel.aggregate([
      {
        $match: {
          docenteId: docenteId,
        },
      },
      {
        $lookup: {
          from: 'materias',
          let: { materiaId: '$asignacionMateriaId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', { $toObjectId: '$$materiaId' }],
                },
              },
            },
          ],
          as: 'materia',
        },
      },
      {
        $unwind: '$materia',
      },
      {
        $project: {
          nombreMateria: '$materia.nombre',
          calificacion: 1,
          estatus: 1,
          intentos: 1,
          observaciones: 1,
        },
      },
    ]);
  }

  async reporteAlumnosPorMateria(materiaId: string) {
    if (!Types.ObjectId.isValid(materiaId)) {
      throw new BadRequestException('ID de materia inválido');
    }

    return this.inscripcionModel.aggregate([
      {
        $match: {
          materiaId: materiaId,
        },
      },
      {
        $lookup: {
          from: 'alumnos',
          let: { alumnoId: '$alumnoId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', { $toObjectId: '$$alumnoId' }],
                },
              },
            },
          ],
          as: 'alumno',
        },
      },
      {
        $unwind: '$alumno',
      },
      {
        $project: {
          nombreAlumno: '$alumno.nombre',
          calificacion: 1,
          estatus: 1,
          intentos: 1,
          observaciones: 1,
        },
      },
    ]);
  }
}
