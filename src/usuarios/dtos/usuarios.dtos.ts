import { ApiProperty, PartialType } from '@nestjs/swagger';
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
//import { PartialType } from '@nestjs/mapped-types';
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
  @ApiProperty({
    example: 'Juan Martinez',
    description: 'Descripción de nombreCompleto',
  })
  @IsNotEmpty()
  readonly nombreCompleto: string;

  @IsString()
  @ApiProperty({ example: '20230098', description: 'Descripción de matricula' })
  @IsNotEmpty()
  readonly matricula: string;

  @IsEmail()
  @ApiProperty({
    example: '20230098@uthh.edu.mx',
    description: 'Descripción de correo',
  })
  @IsNotEmpty()
  readonly correo: string;

  @IsString()
  @MinLength(6)
  readonly contraseña: string;

  @ApiProperty({
    example: 'ALUMNO, MAESTRO',
    description: 'Descripción de rol',
  })
  @IsEnum(RolEnum)
  readonly rol: RolEnum;

  @IsBoolean()
  @IsOptional()
  readonly activo?: boolean;

  @IsString()
  @ApiProperty({
    example: '2dedf',
    description: 'Descripción de preguntaSeguridad',
  })
  @IsNotEmpty()
  readonly preguntaSeguridad: string;

  @IsString()
  @ApiProperty({
    example: 'qwdfe',
    description: 'Descripción de respuestaSeguridad',
  })
  @IsNotEmpty()
  readonly respuestaSeguridad: string;

  @IsString()
  @ApiProperty({
    example: '3345454423',
    description: 'Descripción de telefono',
  })
  @IsOptional()
  readonly telefono?: string;

  @IsDateString()
  @ApiProperty({
    example: '2001-06-11T00:00:00.000+00:00',
    description: 'Descripción de fechaNacimiento',
  })
  @IsOptional()
  readonly fechaNacimiento?: Date;

  @ValidateNested()
  @Type(() => DireccionDto)
  @ApiProperty({ example: '...,...,...,...', description: 'Descripción' })
  @IsOptional()
  readonly direccion?: DireccionDto;

  @IsString()
  @IsOptional()
  readonly avatar?: string;
}

export class UpdateUsuarioDto extends PartialType(UsuarioDto) {}
