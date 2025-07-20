import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { RolEnum } from '../schemas/aulas.schema';

export class AulaDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly ubicacion: string;

  @IsNumber()
  @IsNotEmpty()
  readonly capacidad: number;

  @IsEnum(RolEnum)
  readonly tipo: RolEnum;
}

export class UpdateAulaDto extends PartialType(AulaDto) {}
