import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AsignacionDocument = Asignacion & Document;

export enum RolEnum {
  Lunes = 'Lunes',
  Martes = 'Martes',
  Miercoles = 'Miercoles',
  Jueves = 'Jueves',
  Viernes = 'Viernes',
}

@Schema({ timestamps: true })
export class Asignacion {
  @Prop({ type: Types.ObjectId, ref: 'Docentes', required: true })
  docenteId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Materias', required: true })
  materiaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Aulas', required: true })
  aulaId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CiclosEscolares', required: true })
  cicloEscolarId: Types.ObjectId;

  @Prop({ required: true })
  grupo: string;

  @Prop({ enum: RolEnum, required: true })
  horarios_dia: RolEnum;

  @Prop({ required: true })
  horarios_horaInicio: Date;

  @Prop({ required: true })
  horarios_horaFin: Date;

  @Prop({ required: true })
  activo: boolean;
}

export const AsignacionSchema = SchemaFactory.createForClass(Asignacion);