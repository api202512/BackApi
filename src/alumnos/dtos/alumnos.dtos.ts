import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsMongoId,
  IsDate,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class AlumnoDto {

  @IsMongoId()
  @IsNotEmpty()
  readonly usuarioId: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly generacionId: string;

  @IsString()
  @IsNotEmpty()
  readonly modalidad: string;

  @IsString()
  @IsNotEmpty()
  readonly grupo: string;

  @IsString()
  @IsNotEmpty()
  readonly estatus: string;

  @IsNumber()
  @IsNotEmpty()
  readonly promedioGeneral: number;

  @IsNumber()
  @IsNotEmpty()
  readonly creditosAcumulados: number;

  @IsDate()
  @IsNotEmpty()
  readonly fechaIngreso: Date;

  @IsDate()
  @IsNotEmpty()
  readonly fechaEgreso: Date;
}

export class UpdateAlumnoDto extends PartialType(AlumnoDto) {}
