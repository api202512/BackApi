import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApiUsoDocument = ApiUso & Document;

@Schema()
export class ApiUso {
  @Prop({ type: Types.ObjectId, ref: 'Login', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  apiKey: string;

  @Prop({ required: true })
  endpoint: string;

  @Prop({ default: Date.now })
  fecha: Date;
}

export const ApiUsoSchema = SchemaFactory.createForClass(ApiUso);
