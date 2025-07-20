import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ref } from 'process';
import { Login } from 'src/login/schemas/login.schema';

export type ApiUsoDocument = ApiUso & Document;

@Schema()
export class ApiUso {
  @Prop({ type: Types.ObjectId, ref: 'Login', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Login', required: true })
  email: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ApiKey', required: true })
  apiKey: string;

  @Prop({ required: true })
  endpoint: string;

  @Prop({ default: Date.now })
  fecha: Date;
}

export const ApiUsoSchema = SchemaFactory.createForClass(ApiUso);
