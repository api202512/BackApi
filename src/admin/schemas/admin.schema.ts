import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdministradoresDocument = Administradores & Document;

@Schema({ timestamps: true })
export class Administradores {
  @Prop({ type: Types.ObjectId, ref: 'Usuarios', required: true })
  usuarioId: string;
}

export const AdministradoresSchema = SchemaFactory.createForClass(Administradores);