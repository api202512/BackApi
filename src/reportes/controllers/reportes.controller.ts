import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ReportesService } from './../services/reportes.service';

@ApiTags('Reportes')
@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('alumnos')
  obtenerAlumnosInscritos() {
    return this.reportesService.reporteAlumnos();
  }

  @Get('materias')
  obtenerMateriasPorCiclo(@Query('cicloId') cicloId: string) {
    return this.reportesService.reporteMateriasPorCiclo(cicloId);
  }

  @Get('docentes')
  obtenerDocentesAsignados() {
    return this.reportesService.reporteDocentes();
  }

  @ApiOperation({ summary: 'Obtener un alumno con su o sus materias' })
  @ApiParam({ name: 'id', required: true, description: 'ID del alumno' })
  @ApiResponse({ status: 400, description: 'ID de alumno inválido' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get('alumnos/:id/materias')
  async obtenerMateriasDeAlumno(@Param('id') id: string) {
    return this.reportesService.reporteMateriasPorAlumno(id);
  }
}
