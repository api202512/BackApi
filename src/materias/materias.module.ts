import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MateriasController } from '../materias/controllers/materias.controller';
import { MateriasService } from '../materias/services/materias.service';
import { Materia, MateriaSchema } from './schemas/materias.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Materia.name, schema: MateriaSchema }
    ]),
  ],
  controllers: [MateriasController],
  providers: [MateriasService],
  exports: [MateriasService],
})
export class MateriasModule {}