import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class MateriaDto {
  @IsString()
  @ApiProperty({
    example: 'estructuras de datos',
    description: 'Descripción de nombre',
  })
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @ApiProperty({ example: 'IANC33F', description: 'Descripción de clave' })
  @IsNotEmpty()
  readonly clave: string;

  @IsString()
  @ApiProperty({ example: 'Opcional', description: 'Descripción' })
  @IsOptional()
  readonly descripcion?: string;

  @IsNumber()
  @ApiProperty({ example: 3, description: 'Descripción de cuatrimestre' })
  @IsNotEmpty()
  readonly cuatrimestre: number;

  @IsNumber()
  @ApiProperty({ example: 4, description: 'Descripción de creditos' })
  @IsNotEmpty()
  readonly creditos: number;

  @IsNumber()
  @ApiProperty({ example: 19, description: 'Descripción de horasTeoricas' })
  @IsNotEmpty()
  readonly horasTeoricas: number;

  @IsNumber()
  @ApiProperty({ example: 32, description: 'Descripción de horasPracticas' })
  @IsNotEmpty()
  readonly horasPracticas: number;

  @IsBoolean()
  @ApiProperty({ example: 'Opcional', description: 'Descripción de activo' })
  @IsOptional()
  readonly activa?: boolean;
}

export class UpdateMateriaDto extends PartialType(MateriaDto) {}
