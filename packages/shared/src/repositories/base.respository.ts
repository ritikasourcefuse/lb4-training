import {DefaultCrudRepository, Entity, DataObject, Options} from '@loopback/repository';

export interface TimestampedEntity {
    createdOn?: string;
    modifiedOn?: string;
  }
  
  export type TimestampedDataObject<T extends Entity> = T & TimestampedEntity;

export class BaseRepository<
  T extends Entity & TimestampedEntity,
  ID,
  Relations extends object
> extends DefaultCrudRepository<T, ID, Relations> {
  async createWithDateTracking(entity: DataObject<T>, options?: Options): Promise<T> {
    const now = new Date().toISOString();
    entity.createdOn = now;
    entity.modifiedOn = now;
    return super.create(entity, options);
  }

  async updateWithDateTracking(entity: DataObject<T>, options?: Options): Promise<void> {
    entity.modifiedOn = new Date().toISOString();
    await super.update(entity, options);
  }
}
