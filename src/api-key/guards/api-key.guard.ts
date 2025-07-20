// src/api-key/guards/api-key.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiKeyService } from '../services/api-key.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apiKeyService: ApiKeyService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKeyHeader = request.headers['x-api-key'];

    if (!apiKeyHeader) {
      throw new UnauthorizedException('API Key requerida');
    }

    const apiKey = await this.apiKeyService.validarClave(apiKeyHeader);

    if (!apiKey || !apiKey.isActive) {
      throw new UnauthorizedException('API Key inválida o inactiva');
    }
    request.apiKeyId = apiKey._id;
    request.apiKeyUserId = apiKey.userId;

    return true;
  }
}
