import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ref } from 'process';

export type ApiUsoDocument = ApiUso & Document;

@Schema()
export class ApiUso {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Logins' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: String, ref: 'Logins' })
  email: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'ApiKeys' })
  apiKey: Types.ObjectId;

  @Prop({ required: true })
  endpoint: string;

  @Prop({ default: Date.now })
  fecha: Date;
}

export const ApiUsoSchema = SchemaFactory.createForClass(ApiUso);
