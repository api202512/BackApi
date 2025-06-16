import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocentesController } from '../docentes/controllers/docentes.controller';
import { DocentesService } from '../docentes/services/docentes.service';
import { Docente, DocenteSchema } from './schemas/docentes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Docente.name, schema: DocenteSchema },
    ]),
  ],
  controllers: [DocentesController],
  providers: [DocentesService],
})
export class DocentesModule {}
