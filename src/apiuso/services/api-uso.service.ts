import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiUso } from 'src/apiuso/schemas/api-uso.schema';
import { Login } from 'src/login/schemas/login.schema';

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
      ...data,
      fecha: new Date(),
    });
  }

  async obtenerTodos() {
    return this.usoModel.find().sort({ fecha: -1 }).exec();
  }
}



