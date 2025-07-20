import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoginDocument = Login & Document;

@Schema()
export class Login {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: ['admin', 'usuario'],
    default: 'usuario',
    select: true,
  })
  rol: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
