import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class GeneracionDto {
  @IsNumber()
  @IsNotEmpty()
  readonly anioInicio: number;

  @IsNumber()
  @IsNotEmpty()
  readonly anioFin: number;

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