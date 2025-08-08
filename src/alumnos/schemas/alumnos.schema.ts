import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';
import { Materia } from './../../materias/schemas/materias.schema';

export type AlumnoDocument = Alumno & Document;

export enum EstatusAlumnoEnum {
  ACTIVO = 'ACTIVO',
  BAJA_TEMPORAL = 'BAJA_TEMPORAL',
  BAJA_DEFINITIVA = 'BAJA_DEFINITIVA',
  EGRESADO = 'EGRESADO',
}

@Schema()
export class Alumno {
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Generacion', required: true })
  generacionId: Types.ObjectId;

  @Prop({ default: 'cuatrimestral', required: true })
  modalidad: string;

  @Prop({ required: true })
  grupo: string;

  @Prop({ enum: EstatusAlumnoEnum, default: EstatusAlumnoEnum.ACTIVO })
  estatus: EstatusAlumnoEnum;

  @Prop({ default: 0, required: true })
  promedioGeneral: number;

  @Prop({ default: 0, required: true })
  creditosAcumulados: number;

  @Prop({ default: Date.now })
  fechaIngreso: Date;

  @Prop({ required: true })
  fechaEgreso: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Materia' }] })
  materias: Materia[];
}

export const AlumnoSchema = SchemaFactory.createForClass(Alumno);
