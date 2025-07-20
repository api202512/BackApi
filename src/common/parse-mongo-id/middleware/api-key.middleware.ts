import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiKeyService } from 'src/api-key/services/api-key.service';
import { ApiUsoService } from 'src/apiuso/services/api-uso.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly usoApiKeyService: ApiUsoService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      return res.status(401).json({ mensaje: 'API Key no proporcionada' });
    }

    const registro = await this.apiKeyService.validarClave(apiKey);

    if (!registro || !registro.isActive) {
      return res.status(401).json({ mensaje: 'API Key inválida o inactiva' });
    }

    // Verifica que userId haya sido correctamente "populado"
    const user = registro.userId as any;

    await this.usoApiKeyService.registrarUso({
      userId: user._id.toString(),
      email: user.email,
      apiKey: registro.apiKey,
      endpoint: req.originalUrl,
    });

    next();
  }
}
