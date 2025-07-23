import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdministradoresDocument = Administradores & Document;

@Schema()
export class Administradores {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  correo: string;

  @Prop({ required: true })
  contraseña: string;

  @Prop({ required: true })
  rol?: string;
}

export const AdministradoresSchema =
  SchemaFactory.createForClass(Administradores);
