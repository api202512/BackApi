import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { Login, LoginSchema } from './schemas/login.schema';
import {
  RegistroAdmin,
  RegistroAdminSchema,
} from './schemas/registroAdmin.schema';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: Login.name, schema: LoginSchema },
      { name: RegistroAdmin.name, schema: RegistroAdminSchema },
    ]),
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
