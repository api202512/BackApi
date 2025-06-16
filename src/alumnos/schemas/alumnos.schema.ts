import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AlumnoDocument = Alumno & Document;

export enum EstatusAlumnoEnum {
  ACTIVO = 'ACTIVO',
  BAJA_TEMPORAL = 'BAJA_TEMPORAL',
  BAJA_DEFINITIVA = 'BAJA_DEFINITIVA',
  EGRESADO = 'EGRESADO'
}

@Schema({ timestamps: true })
export class Alumno {
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Generacion', required: true })
  generacionId: Types.ObjectId;

  @Prop({ default: 'cuatrimestral' })
  modalidad: string;

  @Prop()
  grupo: string;

  @Prop({ enum: EstatusAlumnoEnum, default: EstatusAlumnoEnum.ACTIVO })
  estatus: EstatusAlumnoEnum;

  @Prop({ default: 0 })
  promedioGeneral: number;

  @Prop({ default: 0 })
  creditosAcumulados: number;

  @Prop({ default: Date.now })
  fechaIngreso: Date;

  @Prop()
  fechaEgreso: Date;
}

export const AlumnoSchema = SchemaFactory.createForClass(Alumno);