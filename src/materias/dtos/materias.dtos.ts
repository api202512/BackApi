import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class MateriaDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly clave: string;

  @IsString()
  @IsOptional()
  readonly descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly cuatrimestre: number;

  @IsNumber()
  @IsNotEmpty()
  readonly creditos: number;

  @IsNumber()
  @IsNotEmpty()
  readonly horasTeoricas: number;

  @IsNumber()
  @IsNotEmpty()
  readonly horasPracticas: number;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly prerequisitos?: string[];

  @IsBoolean()
  @IsOptional()
  readonly activa?: boolean;
}

export class UpdateMateriaDto extends PartialType(MateriaDto) {}
