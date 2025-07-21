import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsMongoId,
  IsDateString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class AlumnoDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    example: '686ae5d43705b69e05f1cb4e',
    description: 'Descripcion de usuarioId',
  })
  readonly usuarioId: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    example: '686ae75f15a92f4fb9c30653',
    description: 'Descripcion de generacionId',
  })
  readonly generacionId: string;

  @IsString()
  @IsNotEmpty()
  presencial;
  @ApiProperty({
    example: 'presencial',
    description: 'Descripcion de modalidad',
  })
  readonly modalidad: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'A', description: 'Descripcion de grupo' })
  readonly grupo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'ACTIVO', description: 'Descripcion de estatus' })
  readonly estatus: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '9', description: 'Descripcion de promedioGeneral' })
  readonly promedioGeneral: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '5',
    description: 'Descripcion de creditosAcumulados',
  })
  readonly creditosAcumulados: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2001-06-11T00:00:00.000+00:00',
    description: 'Descripcion de fechaIngreso',
  })
  readonly fechaIngreso: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2004-06-11T00:00:00.000+00:00',
    description: 'Descripcion de fechaEgreso',
  })
  readonly fechaEgreso: Date;
}

export class UpdateAlumnoDto extends PartialType(AlumnoDto) {}
