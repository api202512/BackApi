import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { ApiKeyService } from '../services/api-key.service';

@Controller('apikey')
export class ApiKeyController {
  constructor(private apiKeyService: ApiKeyService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async obtenerApiKey(@Request() req) {
    console.log('🟢 REQ.USER:', req.user);
    const userId = req.user.userId;
    const apiKey = await this.apiKeyService.obtenerClave(userId);
    return { apiKey };
  }
}
