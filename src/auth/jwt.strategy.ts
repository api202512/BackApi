import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { userInfo } from 'os';
import { use } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'miclaveultrasecreta',
    });
  }

  async validate(payload: any) {
    console.log('TOKEN DECODED:', payload);
    return {
      userId: payload.userId,
      email: payload.email,
      rol: payload.rol,
    };
  }
}