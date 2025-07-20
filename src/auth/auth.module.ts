import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginModule } from './../login/login.module';
import { ApiKeyModule } from './../api-key/api-key.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Login, LoginSchema } from './../login/schemas/login.schema';


@Module({
    imports: [
        PassportModule,
        ApiKeyModule,
        forwardRef(() => LoginModule),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'miclaveultrasecreta',
            signOptions: { expiresIn: '7d' },
        }),
        MongooseModule.forFeature([{ name: Login.name, schema: LoginSchema }
        ]),
    ],
    providers: [
        AuthService, JwtStrategy, JwtAuthGuard],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
