import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import { DbDataSource, Order, OrderRelations } from 'shared';


export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Order, dataSource);
  }
}
