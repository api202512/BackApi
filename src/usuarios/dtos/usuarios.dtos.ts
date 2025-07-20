import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { RolEnum } from '../schemas/usuarios.schema';

class DireccionDto {
  @IsString()
  @IsOptional()
  calle?: string;

  @IsString()
  @IsOptional()
  ciudad?: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  codigoPostal?: string;
}

export class UsuarioDto {
  @IsString()
  @IsNotEmpty()
  readonly nombreCompleto: string;

  @IsString()
  @IsNotEmpty()
  readonly matricula: string;

  @IsEmail()
  @IsNotEmpty()
  readonly correo: string;

  @IsString()
  @MinLength(6)
  readonly contraseña: string;

  @IsEnum(RolEnum)
  readonly rol: RolEnum;

  @IsBoolean()
  @IsOptional()
  readonly activo?: boolean;

  @IsString()
  @IsNotEmpty()
  readonly preguntaSeguridad: string;

  @IsString()
  @IsNotEmpty()
  readonly respuestaSeguridad: string;

  @IsString()
  @IsOptional()
  readonly telefono?: string;

  @IsDateString()
  @IsOptional()
  readonly fechaNacimiento?: Date;

  @ValidateNested()
  @Type(() => DireccionDto)
  @IsOptional()
  readonly direccion?: DireccionDto;

  @IsString()
  @IsOptional()
  readonly avatar?: string;
}

export class UpdateUsuarioDto extends PartialType(UsuarioDto) {}
