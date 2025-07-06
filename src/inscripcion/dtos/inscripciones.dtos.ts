import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsMongoId, 
  IsEnum,
  IsDateString
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { RolEnum } from '../schemas/inscripcion.schema';

export class InscripcionDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly alumnoId: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly asignacionMateriaId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly calificacion: number;

  @IsEnum(RolEnum)
  readonly estatus: RolEnum;

  @IsDateString()
  @IsNotEmpty()
  readonly fechaInscripcion: Date;

  @IsDateString()
  @IsNotEmpty()
  readonly fechaCalificacion: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly intentos: number;

  @IsString()
  @IsNotEmpty()
  readonly observaciones: string;
}

export class UpdateInscripcionDto extends PartialType(InscripcionDto) {}