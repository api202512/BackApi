import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ApiKey } from './../schemas/api-key.schema';
import { Types } from 'mongoose';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>,
  ) {}

  async obtenerClave(userId: string): Promise<string> {
    try {
      const objectId = Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : userId;

      console.log('🔍 Buscando API key para userId:', objectId);


      const existente = await this.apiKeyModel.findOne({ userId: objectId });
      if (existente) return existente.apiKey;

      console.log('📦 Resultado existente:', existente);


      const nuevaKey = uuidv4();

      const creada = await this.apiKeyModel.create({
        userId: objectId,
        apiKey: nuevaKey,
        isActive: true,
        createdAt: new Date(),
      });

      return creada.apiKey;
    } catch (error) {
      console.error('❌ Error al generar API key:', error);
      throw new BadRequestException('Error interno al generar API key');
    }
  }


  async validarClave(apiKey: string) {
    const registro = await this.apiKeyModel.findOne({ apiKey }).populate('userId');
    return registro; 
}

}
