import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AsignacionDocument = Asignacion & Document;

@Schema()
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

  @Prop({
    type: {
      dia: String,
      horaInicio: String,
      horaFin: String
    }
   })
   Horarios: {
    dia: string,
    horaInicio: string,
    horaFin: string
   }
}

export const AsignacionSchema = SchemaFactory.createForClass(Asignacion);