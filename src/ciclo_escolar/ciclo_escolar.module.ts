import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CicloEscolarController } from '../ciclo_escolar/controllers/ciclo_escolar.controller';
import { CicloEscolarService } from '../ciclo_escolar/services/ciclo_escolar.service';
import { CicloEscolar, CicloEscolarSchema } from './schemas/ciclo_escolar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CicloEscolar.name, schema: CicloEscolarSchema },
    ]),
  ],
  controllers: [CicloEscolarController],
  providers: [CicloEscolarService],
})
export class CicloEscolarModule {}
