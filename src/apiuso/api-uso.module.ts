import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiUso, ApiUsoSchema } from './schemas/api-uso.schema';
import { ApiUsoController } from './controllers/api-uso.controller';
import { ApiUsoService } from './services/api-uso.service';
import { Login, LoginSchema } from '../login/schemas/login.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApiUso.name, schema: ApiUsoSchema },
      { name: Login.name, schema: LoginSchema },
    ]),
  ],
  controllers: [ApiUsoController],
  providers: [ApiUsoService],
  exports: [MongooseModule, ApiUsoService],
})
export class ApiUsoModule {}
