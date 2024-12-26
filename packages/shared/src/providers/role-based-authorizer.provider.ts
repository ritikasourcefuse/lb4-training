import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,
  Authorizer,
} from '@loopback/authorization';
import {Provider, injectable} from '@loopback/core';

@injectable()
export class RoleBasedAuthorizerProvider implements Provider<Authorizer> {
  value(): Authorizer {
    return async (
      context: AuthorizationContext,
      metadata: AuthorizationMetadata,
    ): Promise<AuthorizationDecision> => {
      const userRoles = context.principals?.[0]?.roles || [];
      console.log('User Roles:', userRoles);
      console.log('Allowed Roles:', metadata.allowedRoles);

      if (metadata.allowedRoles?.some(role => userRoles.includes(role))) {
        console.log('Authorization Decision: ALLOW');
        return AuthorizationDecision.ALLOW;
      }

      console.log('Authorization Decision: DENY');
      return AuthorizationDecision.DENY;
    };
  }
}
