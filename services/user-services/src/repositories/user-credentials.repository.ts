import {inject} from '@loopback/core';
import {DbDataSource} from 'shared';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository';
import {
  UserCredentials,
  UserCredentialsRelations,
} from '../models/user.credential.model';

export class UserCredentialsRepository extends DefaultSoftCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(UserCredentials, dataSource);
  }
}
