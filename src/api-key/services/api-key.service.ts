import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import { ApiKey } from './../schemas/api-key.schema';
@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>,
  ) {}

  async obtenerOGenerar(userId: string): Promise<string> {
    const existente = await this.apiKeyModel.findOne({ userId });
    if (existente) return existente.apiKey;

    const nueva = new this.apiKeyModel({
      userId,
      apiKey: randomBytes(32).toString('hex')
    });

    const creada = await nueva.save();
    return creada.apiKey;
  }
}
