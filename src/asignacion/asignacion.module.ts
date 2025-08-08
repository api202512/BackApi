import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AsignacionController } from '../asignacion/controllers/asignacion.controller';
import { AsignacionService } from '../asignacion/services/asignacion.service';
import { AsignacionSchema } from './schemas/asignacion.schema';
import { Asignacion } from './schemas/asignacion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asignacion.name, schema: AsignacionSchema },
    ]),
  ],
  controllers: [AsignacionController],
  providers: [AsignacionService],
})
export class AsignacionModule {}
