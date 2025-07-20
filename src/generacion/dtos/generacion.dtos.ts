import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class GeneracionDto {
  @IsDateString()
  @IsNotEmpty()
  readonly anioInicio: Date;

  @IsDateString()
  @IsNotEmpty()
  readonly anioFin: Date;

  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  readonly totalAlumnos: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly activo: boolean;
}

export class UpdateGeneracionDto extends PartialType(GeneracionDto) {}
