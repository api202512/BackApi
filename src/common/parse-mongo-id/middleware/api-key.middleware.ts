import { 
  Injectable, 
  NestMiddleware, 
  UnauthorizedException 
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiKeyService } from './../../../api-key/services/api-key.service';
import { ApiUsoService } from './../../../apiuso/services/api-uso.service';
import { Login } from './../../../login/schemas/login.schema';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly apiUsoService: ApiUsoService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const key = req.headers['x-api-key'];
    if (!key || typeof key !== 'string') throw new UnauthorizedException('Falta la API Key');

    const registro = await this.apiKeyService.validarClave(key);
    if (!registro) throw new UnauthorizedException('API Key inválida');

    await this.apiUsoService.registrarUso(Login.toString(), key, req.originalUrl);
    next();
  }
}
