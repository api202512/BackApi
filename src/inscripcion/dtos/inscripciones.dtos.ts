import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsMongoId,
  IsEnum,
  IsDateString,
} from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';
import { RolEnum } from '../schemas/inscripcion.schema';

export class InscripcionDto {
  @IsMongoId()
  @ApiProperty({
    example: '686ae8aec1345367edadeb48',
    description: 'Descripción de alumnoId',
  })
  @IsNotEmpty()
  readonly alumnoId: string;

  @IsMongoId()
  @ApiProperty({
    example: '686ae83ac1345367edadeb46',
    description: 'Descripción de asignacionMateriaId',
  })
  @IsNotEmpty()
  readonly asignacionMateriaId: string;

  @IsNumber()
  @ApiProperty({ example: 8, description: 'Descripción de calificacion' })
  @IsNotEmpty()
  readonly calificacion: number;

  @ApiProperty({ example: 'APROBADO', description: 'Descripción de estatus' })
  @IsEnum(RolEnum)
  readonly estatus: RolEnum;

  @IsDateString()
  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Descripción de fechaInscripcion',
  })
  @IsNotEmpty()
  readonly fechaInscripcion: Date;

  @IsDateString()
  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Descripción de fechaCalificacion',
  })
  @IsNotEmpty()
  readonly fechaCalificacion: Date;

  @IsNumber()
  @ApiProperty({ example: 2, description: 'Descripción de intentos' })
  @IsNotEmpty()
  readonly intentos: number;

  @IsString()
  @ApiProperty({
    example: 'Estudiar mas',
    description: 'Descripción de observaciones',
  })
  @IsNotEmpty()
  readonly observaciones: string;
}

export class UpdateInscripcionDto extends PartialType(InscripcionDto) {}
