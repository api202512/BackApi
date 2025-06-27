import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministradorController } from '../admin/controllers/admin.controller';
import { AdministradorService } from '../admin/services/admin.service';
import { Administradores, AdministradoresSchema } from './schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Administradores.name, schema: AdministradoresSchema },
    ]),
  ],
  controllers: [AdministradorController],
  providers: [AdministradorService],
})
export class AdministradoresModule {}
