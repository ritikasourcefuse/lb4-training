import {inject} from '@loopback/core';
import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {JWTService} from '../jwt-service';

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(
    @inject('services.authentication.jwt.tokenservice')
    public jwtService: JWTService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    console.log(request);
    const token = this.extractCredentials(request);
    if (!token) {
      throw new HttpErrors.Unauthorized('Authorization token is missing');
    }
    try {
      const userProfile = await this.jwtService.verifyToken(token);
      return {
        ...userProfile,
        [securityId]: userProfile.id,
      };
    } catch (error) {
      throw new HttpErrors.Unauthorized('Invalid authorization token');
    }
  }

  extractCredentials(request: Request): string | undefined {
    const token = request.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
      return token.slice(7);
    }
    return undefined;
  }
}
