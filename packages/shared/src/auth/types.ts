import {securityId} from '@loopback/security';

export interface Credentials {
  email: string;
  password: string;
}

export interface MyUserProfile {
  [securityId]: string;
  id: string;
  email: string;
  roles: string[];
}
