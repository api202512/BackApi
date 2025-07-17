import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdministradoresModule } from './admin/admin.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DocentesModule } from './docentes/docentes.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { MateriasModule } from './materias/materias.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { GeneracionModule } from './generacion/generacion.module';
import { CicloEscolarModule } from './ciclo_escolar/ciclo_escolar.module';
import { AulasModule } from './aulas/aulas.module';
import { AsignacionModule } from './asignacion/asignacion.module';
import { AppService } from './app.service';

@Module({
  imports: [
    LoginModule,
    LoginModule,
    AuthModule,
    InscripcionModule,
    GeneracionModule,
    CicloEscolarModule,
    AulasModule,
    AsignacionModule,
    AdministradoresModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UsuariosModule,
    DocentesModule,
    AlumnosModule,
    MateriasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }