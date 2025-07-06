import { 
  IsString, 
  IsNotEmpty, 
  IsBoolean, 
  IsNumber, 
  IsDate 
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class GeneracionDto {
  @IsDate()
  @IsNotEmpty()
  readonly anioInicio: Date;

  @IsDate()
  @IsNotEmpty()
  readonly anioFin: Date;

  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  readonly totalAlumnos: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly activo: boolean;
}

export class UpdateGeneracionDto extends PartialType(GeneracionDto) {}