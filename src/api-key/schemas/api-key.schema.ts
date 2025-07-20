import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApiKeyDocument = ApiKey & Document;

@Schema()
export class ApiKey {
  @Prop({ type: Types.ObjectId, ref: 'Login', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true, unique: true })
  apiKey: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
