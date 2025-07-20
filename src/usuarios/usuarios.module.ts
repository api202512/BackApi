import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioController } from '../usuarios/controllers/usuarios.controller';
import { UsuarioService } from '../usuarios/services/usuarios.service';
import { Usuario, UsuarioSchema } from './schemas/usuarios.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuariosModule {}
