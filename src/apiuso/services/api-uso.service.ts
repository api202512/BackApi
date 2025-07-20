import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiUso } from 'src/apiuso/schemas/api-uso.schema';
import { Login } from 'src/login/schemas/login.schema';

@Injectable()
export class ApiUsoService {
  constructor(
    @InjectModel(Login.name) private userModel: Model<Login>,
    @InjectModel(ApiUso.name) private usoModel: Model<ApiUso>,
  ) {}

  async registrarUso(usuarioId: string, apiKey: string, endpoint: string) {
    const registro = new this.usoModel({
      usuario: usuarioId,
      apiKey,
      endpoint,
    });

    return await registro.save();
  }

  async obtenerRegistrosUso() {
    return this.usoModel.find()
      .populate('usuario', 'nombre email')
      .sort({ fecha: -1 })
      .exec();
  }
}
