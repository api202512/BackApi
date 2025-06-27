import { 
  IsString, 
  IsNotEmpty, 
  IsMongoId, 
  IsEnum,
  IsDateString,
  IsBoolean
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { RolEnum } from '../schemas/asignacion.schema';

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
  readonly cicloEscolarId: string

  @IsString()
  @IsNotEmpty()
  readonly grupo: string;

  @IsEnum(RolEnum)
  readonly horarios_dia: RolEnum;

  @IsDateString()
  @IsNotEmpty()
  readonly horarios_horaInicio: Date;

  @IsDateString()
  @IsNotEmpty()
  readonly horarios_horaFin: Date;

  @IsBoolean()
  @IsNotEmpty()
  readonly activo: boolean;
}

export class UpdateAsignacionDto extends PartialType(AsignacionDto) {}