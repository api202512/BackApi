import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class LoginDto {
  @IsString()
  @ApiProperty({
    example: '20230087@uthh.edu.mx',
    description: 'Descripción de email',
  })
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @ApiProperty({ example: '12345', description: 'Descripción de password' })
  @IsNotEmpty()
  readonly password: string;
}

export class UpdateLoginDto extends PartialType(LoginDto) {}
