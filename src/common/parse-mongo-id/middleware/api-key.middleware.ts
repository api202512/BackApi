import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiKeyService } from 'src/api-key/services/api-key.service';
import { ApiUsoService } from 'src/apiuso/services/api-uso.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly apiUsoService: ApiUsoService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedException('API Key requerida');
    }

    const registro = await this.apiKeyService.validarApiKey(apiKey);

    if (!registro || !registro.isActive) {
      throw new UnauthorizedException('API Key inválida o inactiva');
    }

    // ✅ Registrar uso del endpoint
    await this.apiUsoService.registrarUso({
      userId: registro.userId._id.toString(),
      email: (registro.userId as any)?.email ?? '',
      apiKey: apiKey,
      endpoint: req.originalUrl,
    });

    next();
  }
}
