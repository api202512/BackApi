import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class RegistroDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly rol: string;
}

export class UpdateRegistroDto extends PartialType(RegistroDto) {}
