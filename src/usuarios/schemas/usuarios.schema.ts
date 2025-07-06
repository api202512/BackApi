import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

export enum RolEnum {
  ADMIN = 'ADMIN',
  PROFESOR = 'PROFESOR',
  ALUMNO = 'ALUMNO',
}

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombreCompleto: string;

  @Prop({ required: true, unique: true })
  matricula: string;

  @Prop({ required: true, unique: true })
  correo: string;

  @Prop({ required: true })
  contraseña: string;

  @Prop({ required: true, enum: RolEnum })
  rol: RolEnum;

  @Prop({ default: true })
  activo: boolean;

  @Prop({ required: true })
  preguntaSeguridad: string;

  @Prop({ required: true })
  respuestaSeguridad: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  fechaNacimiento: Date;

  @Prop({
    type: {
      calle: String,
      ciudad: String,
      estado: String,
      codigoPostal: String,
    }
  })
  direccion: {
    calle: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
  };

  @Prop({ default: Date.now })
  fechaRegistro: Date;

  @Prop()
  ultimoAcceso: Date;

  @Prop()
  avatar: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);