import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InscripcionController } from '../inscripcion/controllers/inscripcion.controller';
import { InscripcionService } from '../inscripcion/services/inscripcion.service';
import { Inscripcion, InscripcionSchema } from './schemas/inscripcion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inscripcion.name, schema: InscripcionSchema },
    ]),
  ],
  controllers: [InscripcionController],
  providers: [InscripcionService],
})
export class InscripcionModule {}
