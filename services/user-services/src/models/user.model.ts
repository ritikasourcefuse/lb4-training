import {Entity, model, property} from '@loopback/repository';

export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Subscriber = 'Subscriber',
}

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(UserRole),
    },
  })
  role: UserRole;

  @property({
    type: 'date',
    required: true,
  })
  createdOn: string;

  @property({
    type: 'date',
    required: true,
  })
  modifiedOn: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
