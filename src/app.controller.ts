import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
