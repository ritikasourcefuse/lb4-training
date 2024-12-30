import {Entity, model, property} from '@loopback/repository';
import {EntityWithIdentifier, IAuthUser} from 'loopback4-authentication';

// @model({
//   name: 'users',
// })
// export class User extends Entity {
//   @property({
//     type: 'string',
//     id: true,
//     generated: true,
//   })
//   id: string;

//   @property({
//     type: 'string',
//     required: true,
//   })
//   email: string;

//   @property({
//     type: 'string',
//     required: true,
//   })
//   password: string;

//   @property({
//     type: 'string',
//     default: 'Subscriber', // Default role is "Subscriber"
//     jsonSchema: {
//       enum: ['SuperAdmin', 'Admin', 'Subscriber'], // Allowed roles
//     },
//   })
//   role: string;

//   @property({
//     type: 'string',
//     default: () => new Date().toISOString(), // Use ISO string
//   })
//   createdOn: string;

//   @property({
//     type: 'string',
//     default: () => new Date().toISOString(), // Use ISO string
//   })
//   modifiedOn: string;
// }

// export interface UserRelations {
//   // describe navigational properties here
// }

// export type UserWithRelations = User & UserRelations;

@model({
  name: 'users',
})
export class User extends Entity implements IAuthUser, EntityWithIdentifier {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    name: 'first_name',
  })
  firstName: string;

  @property({
    type: 'string',
    name: 'last_name',
  })
  lastName: string;

  @property({
    type: 'string',
    name: 'middle_name',
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
  })
  email?: string;

  // Auth provider - 'google'
  @property({
    type: 'string',
    required: true,
    name: 'auth_provider',
  })
  authProvider: string;

  // Id from external provider
  @property({
    type: 'string',
    name: 'auth_id',
  })
  authId?: string;

  @property({
    type: 'string',
    name: 'auth_token',
  })
  authToken?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'number',
    name: 'default_tenant',
  })
  defaultTenant: number;
  constructor(data?: Partial<User>) {
    super(data);
  }
  getIdentifier(): string | undefined {
    return this.id?.toString(); // Return the id as the identifier
  }
}
export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
