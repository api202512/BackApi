import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiUsoService } from '../services/api-uso.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('api-uso')
export class ApiUsoController {
  constructor(private readonly apiUsoService: ApiUsoService) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async getRegistrosUso() {
    return this.apiUsoService.obtenerRegistrosUso();
  }
}
