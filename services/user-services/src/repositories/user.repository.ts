import {inject} from '@loopback/core';
import {User, UserRelations} from '../models/user.model';
import {BaseRepository, TimeStampEntity, DbDataSource} from 'shared';

export class UserRepository extends BaseRepository<
  User & TimeStampEntity,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(User, dataSource);
  }
}
