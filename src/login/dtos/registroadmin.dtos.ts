import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class RegistroAdminDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly claveSecreta: string;

  @IsString()
  @IsNotEmpty()
  readonly rol: string;
}

export class UpdateRegistroAdminDto extends PartialType(RegistroAdminDto) {}
