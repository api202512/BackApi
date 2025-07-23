import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

class HorarioDto {
  @IsString()
  @IsNotEmpty()
  dia: string;

  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  horaFin: string;
}

export class AsignacionDto {
  @IsMongoId()
  @ApiProperty({
    example: '686aeb0bba779ddc4b6f4b3c',
    description: 'Descripción de docenteId',
  })
  @IsNotEmpty()
  readonly docenteId: string;

  @IsMongoId()
  @ApiProperty({
    example: '686ae83ac1345367edadeb46',
    description: 'Descripción de materiaId',
  })
  @IsNotEmpty()
  readonly materiaId: string;

  @IsMongoId()
  @ApiProperty({
    example: '686ae6c8559fa32d21f4607c',
    description: 'Descripción de aulaId',
  })
  @IsNotEmpty()
  readonly aulaId: string;

  @IsMongoId()
  @ApiProperty({
    example: '686ae812c1345367edadeb3e',
    description: 'Descripción de cicloEscolarId',
  })
  @IsNotEmpty()
  readonly cicloEscolarId: string;

  @IsString()
  @ApiProperty({ example: 'B', description: 'Descripción de grupo' })
  @IsNotEmpty()
  readonly grupo: string;

  @ValidateNested()
  @Type(() => HorarioDto)
  @ApiProperty({
    example: 'Lunes, 8:40 a 9:30',
    description: 'Descripción de Horario',
  })
  @IsNotEmpty()
  readonly Horario: HorarioDto;
}

export class UpdateAsignacionDto extends PartialType(AsignacionDto) {}
