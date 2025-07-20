import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ApiUso } from 'src/apiuso/schemas/api-uso.schema';

@Injectable()
export class ApiUsoService {
  constructor(
    @InjectModel(ApiUso.name) private usoModel: Model<ApiUso>,
  ) {}

  async registrarUso(data: {
    userId: string;
    email: string;
    apiKey: string;
    endpoint: string;
  }) {
    await this.usoModel.create({
      userId: new Types.ObjectId(data.userId),
      email: data.email,
      apiKey: data.apiKey,
      endpoint: data.endpoint,
      fecha: new Date(),
    });
  }

  async obtenerTodos() {
    return this.usoModel
      .find()
      .sort({ fecha: -1 })
      .populate('userId', 'nombre email rol')
      .exec();
  }
}
