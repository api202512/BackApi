import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DocentesModule } from './docentes/docentes.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { MateriasModule } from './materias/materias.module';
import { AppService } from './app.service';
/*import { CarrerasModule } from './carreras/carreras.module';
import { AulasModule } from './aulas/aulas.module';
import { CiclosEscolaresModule } from './ciclos-escolares/ciclos-escolares.module';
import { GeneracionesModule } from './generaciones/generaciones.module';
import { AsignacionesModule } from './asignaciones/asignaciones.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { DocumentosModule } from './documentos/documentos.module';*/

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UsuariosModule,
    DocentesModule,
    AlumnosModule,
    MateriasModule,
    /*CarrerasModule,
    AulasModule,
    CiclosEscolaresModule,
    GeneracionesModule,
    AsignacionesModule,
    InscripcionesModule,
    DocumentosModule,*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}