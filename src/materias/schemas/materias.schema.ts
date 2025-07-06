import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MateriaDocument = Materia & Document;

@Schema()
export class Materia {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  clave: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  cuatrimestre: number;

  @Prop({ required: true })
  creditos: number;

  @Prop({ required: true })
  horasTeoricas: number;

  @Prop({ required: true })
  horasPracticas: number;

  @Prop({ default: true })
  activa: boolean;
}

export const MateriaSchema = SchemaFactory.createForClass(Materia);