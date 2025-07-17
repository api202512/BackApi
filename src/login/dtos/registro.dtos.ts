import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsMongoId, 
  IsEnum,
  IsDateString
} from 'class-validator';
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
  readonly password: string;
}

export class UpdateRegistroDto extends PartialType(RegistroDto) {}