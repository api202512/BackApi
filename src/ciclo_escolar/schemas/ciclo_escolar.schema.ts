import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CicloEscolarDocument = CicloEscolar & Document;

@Schema()
export class CicloEscolar {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  fechaInicio: Date;

  @Prop({ required: true })
  fechaFin: Date;
  
  @Prop({ required: true })
  activo: boolean;
}

export const CicloEscolarSchema = SchemaFactory.createForClass(CicloEscolar);