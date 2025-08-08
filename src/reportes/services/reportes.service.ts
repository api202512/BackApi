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
        $lookup: {
          from: 'asignacions',
          localField: 'asignacionMateriaId',
          foreignField: '_id',
          as: 'asignacion',
        },
      },
      { $unwind: '$asignacion' },
      {
        $match: {
          'asignacion.docenteId': docenteId,
        },
      },
      {
        $lookup: {
          from: 'materias',
          localField: 'asignacion.materiaId',
          foreignField: '_id',
          as: 'materia',
        },
      },
      { $unwind: '$materia' },
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
    return this.inscripcionModel.aggregate([
      { $match: { asignacionMateriaId: materiaId } },
      {
        $lookup: {
          from: 'alumnos',
          let: { alumnoIdStr: '$alumnoId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', { $toObjectId: '$$alumnoIdStr' }] },
              },
            },
            {
              $lookup: {
                from: 'usuarios',
                let: { usuarioId: '$usuarioId' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ['$_id', { $toObjectId: '$$usuarioId' }] },
                    },
                  },
                ],
                as: 'usuario',
              },
            },
            { $unwind: '$usuario' },
          ],
          as: 'alumno',
        },
      },
      { $unwind: '$alumno' },
      {
        $project: {
          _id: 0,
          alumnoId: '$alumno._id',
          nombreAlumno: '$alumno.usuario.nombreCompleto',
          calificacion: 1,
          estatus: 1,
          intentos: 1,
          observaciones: 1,
          fechaInscripcion: 1,
          fechaCalificacion: 1,
        },
      },
    ]);
  }
}
