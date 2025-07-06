import { IsString, IsNotEmpty, IsDate, IsBoolean, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CicloEscolarDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsDateString()
  @IsNotEmpty()
  readonly fechaInicio: Date;

  @IsDateString()
  @IsNotEmpty()
  readonly fechaFin: Date;

  @IsBoolean()
  @IsNotEmpty()
  readonly activo: boolean;
}

export class UpdateCicloEscolarDto extends PartialType(CicloEscolarDto) {}