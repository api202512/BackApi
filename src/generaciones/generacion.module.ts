import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneracionController } from '../generaciones/controllers/generaciones.controller';
import { GeneracionService } from '../generaciones/services/generaciones.service';
import { Generacion, GeneracionSchema } from './schemas/generacion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Generacion.name, schema: GeneracionSchema },
    ]),
  ],
  controllers: [GeneracionController],
  providers: [GeneracionService],
})
export class GeneracionModule {}
