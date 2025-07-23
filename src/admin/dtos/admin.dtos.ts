import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
} from 'class-validator';

export class AdministradorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Carlos Pérez',
    description: 'Nombre completo del administrador',
  })
  readonly nombre: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin@uthh.edu.mx',
    description: 'Correo electrónico del administrador',
  })
  readonly correo: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: '123456',
    description: 'Contraseña del administrador (mínimo 6 caracteres)',
  })
  readonly contraseña: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'admin',
    description: 'Rol o tipo de administrador',
    required: false,
  })
  readonly rol?: string;
}
export class UpdateAdministradorDto extends PartialType(AdministradorDto) {}
