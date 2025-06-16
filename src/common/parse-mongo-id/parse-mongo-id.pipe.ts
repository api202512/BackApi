import { 
  ArgumentMetadata, 
  BadRequestException, 
  PipeTransform 
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} no es un MongoID válido`);
    }
    return value;
  }
}
