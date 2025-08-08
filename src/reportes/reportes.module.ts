import { Module } from '@nestjs/common';
import { ReportesController } from './controllers/reportes.controller';
import { ReportesService } from './services/reportes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Alumno, AlumnoSchema } from './../alumnos/schemas/alumnos.schema';
import { Materia, MateriaSchema } from './../materias/schemas/materias.schema';
import {
  Inscripcion,
  InscripcionSchema,
} from './../inscripcion/schemas/inscripcion.schema';

import {
  Docentes,
  DocentesSchema,
} from './../docentes/schemas/docentes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Alumno.name, schema: AlumnoSchema },
      { name: Materia.name, schema: MateriaSchema },
      { name: Docentes.name, schema: DocentesSchema },
      { name: Inscripcion.name, schema: InscripcionSchema },
    ]),
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
