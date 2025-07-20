import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AulaDocument = Aula & Document;

export enum RolEnum {
  AULA = 'AULA',
  LABORATORIO = 'LABORATORIO',
  AUDITORIO = 'AUDITORIO',
}

@Schema()
export class Aula {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  ubicacion: string;

  @Prop({ required: true })
  capacidad: number;

  @Prop({ required: true, enum: RolEnum })
  tipo: RolEnum;
}

export const AulaSchema = SchemaFactory.createForClass(Aula);
