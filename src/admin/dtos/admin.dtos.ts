import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class AdministradorDto {
  @IsMongoId()
  @ApiProperty({
    example: '686aea57940becc19b8cd88e',
    description: 'Descripción de usuarioId',
  })
  @IsNotEmpty()
  readonly usuarioId: string;
}

export class UpdateAdministradorDto extends PartialType(AdministradorDto) {}
