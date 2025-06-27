import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlumnoController } from '../alumnos/controllers/alumnos.controller';
import { AlumnoService } from '../alumnos/services/alumnos.service';
import { Alumno, AlumnoSchema } from './schemas/alumnos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Alumno.name, schema: AlumnoSchema },
    ]),
  ],
  controllers: [AlumnoController],
  providers: [AlumnoService],
})
export class AlumnosModule {}
