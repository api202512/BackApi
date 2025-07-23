import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';
import { RolEnum } from '../schemas/aulas.schema';

export class AulaDto {
  @IsString()
  @ApiProperty({ example: 'L3', description: 'Descripción de nombre' })
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @ApiProperty({
    example: 'Edificio D',
    description: 'Descripción de ubicacion',
  })
  @IsNotEmpty()
  readonly ubicacion: string;

  @IsNumber()
  @ApiProperty({ example: 23, description: 'Descripción de capacidad' })
  @IsNotEmpty()
  readonly capacidad: number;

  @ApiProperty({ example: 'LABORATORIO', description: 'Descripción de tipo' })
  @IsEnum(RolEnum)
  readonly tipo: RolEnum;
}

export class UpdateAulaDto extends PartialType(AulaDto) {}
