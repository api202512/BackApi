import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DocentesDocument = Docentes & Document;

@Schema()
export class Docentes {
  @Prop({ type: Types.ObjectId, ref: 'Usuarios', required: false })
  usuarioId: Types.ObjectId;

  @Prop({ required: true })
  especialidad: string;

  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  experienciaAnio: number;

  @Prop({ required: true })
  fechaIngreso: Date;
}

export const DocentesSchema = SchemaFactory.createForClass(Docentes);
