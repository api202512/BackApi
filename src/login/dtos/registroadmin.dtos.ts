import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class RegistroAdminDto {
  @IsString()
  @ApiProperty({
    example: 'Jose Antonio Martinez Alvarado',
    description: 'Descripción de nombre',
  })
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @ApiProperty({
    example: '20230087@uthh.edu.mx',
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
  @ApiProperty({
    example: 'MiClaveSecretaSegura123',
    description: 'Descripción de password',
  })
  @IsNotEmpty()
  readonly claveSecreta: string;

  @IsString()
  @ApiProperty({ example: 'Admin', description: 'Descripción de rol' })
  @IsNotEmpty()
  readonly rol: string;
}

export class UpdateRegistroAdminDto extends PartialType(RegistroAdminDto) {}
