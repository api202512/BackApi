import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocentesController } from '../docentes/controllers/docentes.controller';
import { DocentesService } from '../docentes/services/docentes.service';
import { Docentes, DocentesSchema } from './schemas/docentes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Docentes.name, schema: DocentesSchema },
    ]),
  ],
  controllers: [DocentesController],
  providers: [DocentesService],
})
export class DocentesModule {}
