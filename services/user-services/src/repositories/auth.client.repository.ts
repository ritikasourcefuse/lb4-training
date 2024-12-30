import {inject} from '@loopback/core';

import {DbDataSource} from 'shared';
import {AuthClient} from '../models/auth-client.model';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository';
import {DefaultCrudRepository} from '@loopback/repository';

export class AuthClientRepository extends DefaultCrudRepository<
  AuthClient,
  typeof AuthClient.prototype.id
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(AuthClient, dataSource);
  }
}
