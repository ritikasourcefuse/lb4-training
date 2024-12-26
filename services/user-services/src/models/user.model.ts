import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'users',
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    default: 'Subscriber', // Default role is "Subscriber"
    jsonSchema: {
      enum: ['SuperAdmin', 'Admin', 'Subscriber'], // Allowed roles
    },
  })
  role: string;

  @property({
    type: 'string',
    default: () => new Date().toISOString(), // Use ISO string
  })
  createdOn: string;

  @property({
    type: 'string',
    default: () => new Date().toISOString(), // Use ISO string
  })
  modifiedOn: string;
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
