import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InscripcionDocument = Inscripcion & Document;

export enum RolEnum {
  APROBADO = 'APROBADO',
  REPROBADO = 'REPROBADO',
  BAJA = 'BAJA',
}

@Schema()
export class Inscripcion {
  @Prop({ type: Types.ObjectId, ref: 'Alumnos', required: true })
  alumnoId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Asignacion', required: true })
  asignacionMateriaId: Types.ObjectId;

  @Prop({ required: true })
  calificacion: number;

  @Prop({ enum: RolEnum, required: true })
  estatus: RolEnum;

  @Prop({ required: true })
  fechaInscripcion: Date;

  @Prop({ required: true })
  fechaCalificacion: Date;

  @Prop({ required: true })
  intentos: number;

  @Prop({ required: true })
  observaciones: string;
}

export const InscripcionSchema = SchemaFactory.createForClass(Inscripcion);
