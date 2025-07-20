import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
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
  @IsNotEmpty()
  readonly docenteId: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly materiaId: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly aulaId: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly cicloEscolarId: string;

  @IsString()
  @IsNotEmpty()
  readonly grupo: string;

  @ValidateNested()
  @Type(() => HorarioDto)
  @IsNotEmpty()
  readonly Horario: HorarioDto;
}

export class UpdateAsignacionDto extends PartialType(AsignacionDto) {}
