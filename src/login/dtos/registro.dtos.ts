import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class RegistroDto {
  @IsString()
  @ApiProperty({
    example: 'pablo',
    description: 'Descripción de nombre',
  })
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @ApiProperty({
    example: 'pablo@uthh.edu.mx',
    description: 'Descripción de email',
  })
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @ApiProperty({ example: '123456', description: 'Descripción de password' })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @ApiProperty({ example: 'Usuario', description: 'Descripción de rol' })
  @IsNotEmpty()
  readonly rol: string;
}

export class UpdateRegistroDto extends PartialType(RegistroDto) {}
