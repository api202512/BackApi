import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GeneracionDocument = Generacion & Document;

@Schema()
export class Generacion {
  @Prop({ required: true })
  anioInicio: Date;

  @Prop({ required: true })
  anioFin: Date;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  totalAlumnos: number;

  @Prop({ required: true })
  activo: boolean;
}

export const GeneracionSchema = SchemaFactory.createForClass(Generacion);
