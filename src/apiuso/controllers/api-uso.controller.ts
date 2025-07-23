import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiUsoService } from '../services/api-uso.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@ApiTags('Api Uso')
@Controller('api-uso')
export class ApiUsoController {
  constructor(private readonly apiUsoService: ApiUsoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Obtener datos' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @Get()
  async getRegistrosUso() {
    return this.apiUsoService.obtenerTodos();
  }
}
