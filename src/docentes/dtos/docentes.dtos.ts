import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
} from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';

export class DocenteDto {
  @IsMongoId()
  @ApiProperty({
    example: '686aea35940becc19b8cd88b',
    description: 'Descripción de usuarioId',
  })
  @IsNotEmpty()
  readonly usuarioId: string;

  @IsString()
  @ApiProperty({ example: 'efvrv', description: 'Descripción de especialidad' })
  @IsNotEmpty()
  readonly especialidad: string;

  @IsString()
  @ApiProperty({ example: 'ceec', description: 'Descripción de titulo' })
  @IsNotEmpty()
  readonly titulo: string;

  @IsNumber()
  @ApiProperty({ example: 4, description: 'Descripción de experienciaAnio' })
  @IsNotEmpty()
  readonly experienciaAnio: number;

  @IsDateString()
  @ApiProperty({
    example: '2001-06-11T00:00:00.000Z',
    description: 'Descripción de fechaIngreso',
  })
  @IsNotEmpty()
  readonly fechaIngreso: Date;
}

export class UpdateDocenteDto extends PartialType(DocenteDto) {}
