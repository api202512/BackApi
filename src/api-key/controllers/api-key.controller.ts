import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { ApiKeyService } from '../services/api-key.service';

@ApiTags('Api Key')
@Controller('apikey')
export class ApiKeyController {
  constructor(private apiKeyService: ApiKeyService) {}

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async obtenerApiKey(@Request() req) {
    console.log('REQ.USER:', req.user);
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('El token no contiene userId');
    }
    return { apiKey: await this.apiKeyService.obtenerClave(userId) };
  }
}
