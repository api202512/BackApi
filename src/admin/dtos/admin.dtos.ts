import { IsMongoId, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class AdministradorDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly usuarioId: string;
}

export class UpdateAdministradorDto extends PartialType(AdministradorDto) {}
