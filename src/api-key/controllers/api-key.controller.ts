import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { ApiKeyService } from '../services/api-key.service';
@UseGuards(JwtAuthGuard)
@Controller('apikey')
export class ApiKeyController {
  constructor(private apiKeyService: ApiKeyService) {}

  @Get()
  async obtenerClave(@Req() req) {
    const userId = req.user._id || req.user.id;
    const clave = await this.apiKeyService.obtenerOGenerar(userId);
    return { apiKey: clave };
  }
}
