import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ReportesService } from './../services/reportes.service';

@ApiTags('Reportes')
@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @ApiOperation({ summary: 'Obtener un alumno con su o sus materias' })
  @ApiParam({ name: 'id', required: true, description: 'ID del alumno' })
  @ApiResponse({ status: 400, description: 'ID de alumno inválido' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get('alumnos/:id/materias')
  async obtenerMateriasDeAlumno(@Param('id') id: string) {
    return this.reportesService.reporteMateriasPorAlumno(id);
  }

  @ApiOperation({ summary: 'Obtener materias por docente' })
  @ApiParam({
    name: 'docenteId',
    required: true,
    description: 'ID del docente',
  })
  @ApiResponse({ status: 400, description: 'ID de docente inválido' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get('docentes/:docenteId/materias')
  async obtenerMateriasPorDocente(@Query('docenteId') docenteId: string) {
    return this.reportesService.reporteMateriasPorDocente(docenteId);
  }

  @ApiOperation({ summary: 'Obtener alumnos por materia' })
  @ApiParam({
    name: 'materiaId',
    required: true,
    description: 'ID de la materia',
  })
  @ApiResponse({ status: 400, description: 'ID de materia inválido' })
  @ApiResponse({ status: 200, description: 'Datos obtenidos correctamente' })
  @ApiResponse({ status: 404, description: 'Datos no encontrado' })
  @Get('materias/:materiaId/alumnos')
  async obtenerAlumnosPorMateria(@Query('materiaId') materiaId: string) {
    return this.reportesService.reporteAlumnosPorMateria(materiaId);
  }
}
