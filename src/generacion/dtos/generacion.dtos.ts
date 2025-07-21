import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '2001-06-11T00:00:00.000+00:00',
    description: 'Descripción de anioInicio',
  })
  @IsNotEmpty()
  readonly anioInicio: Date;

  @IsDateString()
  @ApiProperty({
    example: '2001-06-11T00:00:00.000+00:00',
    description: 'Descripción de anioFin',
  })
  @IsNotEmpty()
  readonly anioFin: Date;

  @IsString()
  @ApiProperty({
    example: 'cerge',
    description: 'Descripción de descripcion',
  })
  @IsNotEmpty()
  readonly descripcion: string;

  @IsNumber()
  @ApiProperty({ example: 340, description: 'Descripción de totalAlumnos' })
  @IsNotEmpty()
  readonly totalAlumnos: number;

  @IsBoolean()
  @ApiProperty({ example: true, description: 'Descripción de activo' })
  @IsNotEmpty()
  readonly activo: boolean;
}

export class UpdateGeneracionDto extends PartialType(GeneracionDto) {}
