import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ApiKey } from './../schemas/api-key.schema';
import { Types } from 'mongoose';

@Injectable()
export class ApiKeyService {
  constructor(@InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>) {}

  async obtenerClave(userId: string): Promise<string> {
    try {
      const objectId = Types.ObjectId.isValid(userId)
        ? new Types.ObjectId(userId)
        : userId;

      console.log('🔍 Buscando API key para userId:', objectId);

      const existente = await this.apiKeyModel.findOne({ userId: objectId });
      console.log('📦 Resultado existente:', existente);

      if (existente) return existente.apiKey;

      const nuevaKey = uuidv4();
      console.log('🆕 Generando nueva API Key:', nuevaKey);

      const creada = await this.apiKeyModel.create({
        userId: objectId,
        apiKey: nuevaKey,
        isActive: true,
        createdAt: new Date(),
      });

      console.log('✅ API Key creada:', creada);

      return creada.apiKey;
    } catch (error) {
      console.error('❌ Error al generar API key:', error.message);
      throw new BadRequestException('Error interno al generar API key');
    }
  }

  async validarApiKey(apiKey: string) {
    return this.apiKeyModel
      .findOne({ apiKey })
      .populate('userId', 'nombre email rol') // <-- Asegúrate de esto
      .exec();
  }
}
