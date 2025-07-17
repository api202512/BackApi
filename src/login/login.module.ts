import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginController } from '../login/controllers/login.controller';
import { LoginService } from '../login/services/login.service';
import { Login, LoginSchema } from './schemas/login.schema';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Login.name, schema: LoginSchema },
    ]),
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
