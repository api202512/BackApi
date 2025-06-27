import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';
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

  @IsString()
  @IsNotEmpty()
  readonly experenciaAnio: number;

  @IsString()
  @IsNotEmpty()
  readonly fechaIngreso: Date;
}

export class UpdateDocenteDto extends PartialType(DocenteDto) {}
