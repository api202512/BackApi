import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsMongoId, 
  IsEnum,
  IsDateString
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class LoginDto {

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UpdateLoginDto extends PartialType(LoginDto) {}