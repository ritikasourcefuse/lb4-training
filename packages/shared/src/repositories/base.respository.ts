import {
  DefaultCrudRepository,
  Entity,
  DataObject,
  Options,
} from '@loopback/repository';

export interface TimeStampEntity {
  createdOn?: string;
  modifiedOn?: string;
}

export class BaseRepository<
  T extends Entity & TimeStampEntity,
  ID,
  Relations extends object,
> extends DefaultCrudRepository<T, ID, Relations> {
  async create(entity: DataObject<T>, options?: Options): Promise<T> {
    const now = new Date().toISOString();
    entity.createdOn = now;
    entity.modifiedOn = now;
    return super.create(entity as T, options);
  }

  async update(entity: DataObject<T>, options?: Options): Promise<void> {
    entity.modifiedOn = new Date().toISOString();
    await super.update(entity as T, options);
  }

  async save(entity: DataObject<T>, options?: Options): Promise<T> {
    const now = new Date().toISOString();
    if (!entity.createdOn) {
      entity.createdOn = now;
    }
    entity.modifiedOn = now;
    return super.save(entity as T, options);
  }
}
