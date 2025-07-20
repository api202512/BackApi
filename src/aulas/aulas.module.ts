import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AulasController } from '../aulas/controllers/aulas.controller';
import { AulasService } from '../aulas/services/aulas.service';
import { Aula, AulaSchema } from './schemas/aulas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Aula.name, schema: AulaSchema }]),
  ],
  controllers: [AulasController],
  providers: [AulasService],
})
export class AulasModule {}
