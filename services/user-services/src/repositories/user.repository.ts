import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from 'shared';
import {inject} from '@loopback/core';
import { User, UserRelations } from '../models/user.model';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(User, dataSource);
  }
}
