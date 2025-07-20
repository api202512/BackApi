import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistroAdminDocument = RegistroAdmin & Document;

@Schema()
export class RegistroAdmin {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  claveSecreta: string;

  @Prop({ 
    required: true, 
    enum: ['admin', 'usuario'], 
    default: 'admin', 
    select: true 
  })
  rol: string;
}

export const RegistroAdminSchema = SchemaFactory.createForClass(RegistroAdmin);
