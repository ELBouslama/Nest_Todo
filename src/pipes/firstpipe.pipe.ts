import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FirstpipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
 // ajouter une fonction afin de changer la valeur du requete récu 
    return value;
  }
}
