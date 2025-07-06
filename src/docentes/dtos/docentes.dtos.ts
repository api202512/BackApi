import { 
  IsMongoId, 
  IsString, 
  IsNotEmpty, 
  IsDateString, 
  IsNumber 
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class DocenteDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly usuarioId: string;

  @IsString()
  @IsNotEmpty()
  readonly especialidad: string;

  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly experienciaAnio: number;

  @IsDateString()
  @IsNotEmpty()
  readonly fechaIngreso: Date;
}

export class UpdateDocenteDto extends PartialType(DocenteDto) {}
