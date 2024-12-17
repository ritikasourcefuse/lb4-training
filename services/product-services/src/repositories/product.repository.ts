import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Product, ProductRelations} from '../models';
import { DbDataSource } from 'shared';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Product, dataSource);
  }
}
