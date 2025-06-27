import { IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CicloEscolarDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsDate()
  @IsNotEmpty()
  readonly fechaInicio: Date;

  @IsDate()
  @IsNotEmpty()
  readonly fechaFin: Date;

  @IsBoolean()
  @IsNotEmpty()
  readonly activo: boolean;
}

export class UpdateCicloEscolarDto extends PartialType(CicloEscolarDto) {}