import { Authorizer } from '@loopback/authorization';
import { Provider } from '@loopback/core';
export declare class RoleBasedAuthorizerProvider implements Provider<Authorizer> {
    value(): Authorizer;
}
