import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CicloEscolarDto {
  @IsString()
  @ApiProperty({
    example: 'Generacion 2001',
    description: 'Descripción de nombre',
  })
  @IsNotEmpty()
  readonly nombre: string;

  @IsDateString()
  @ApiProperty({
    example: '2001-06-11T00:00:00.000Z',
    description: 'Descripción de fechaInicio',
  })
  @IsNotEmpty()
  readonly fechaInicio: Date;

  @IsDateString()
  @ApiProperty({
    example: '2001-06-11T00:00:00.000Z',
    description: 'Descripción de fechaFin',
  })
  @IsNotEmpty()
  readonly fechaFin: Date;

  @IsBoolean()
  @ApiProperty({ example: false, description: 'Descripción de activo' })
  @IsNotEmpty()
  readonly activo: boolean;
}

export class UpdateCicloEscolarDto extends PartialType(CicloEscolarDto) {}
