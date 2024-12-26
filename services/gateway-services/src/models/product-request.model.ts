import {model, property} from '@loopback/repository';

@model()
export class ProductRequest {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
  })
  category?: string;
}
