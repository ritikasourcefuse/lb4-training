import {TokenService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {securityId} from '@loopback/security';
import jwt from 'jsonwebtoken';
import {MyUserProfile} from './types';
import {TokenServiceBindings} from './key';

export class JWTService implements TokenService {
  constructor(
    @inject(TokenServiceBindings.SECRET) private jwtSecret: string,
    @inject(TokenServiceBindings.EXPIRES_IN) private expiresIn: string,
  ) {}

  async verifyToken(token: string): Promise<MyUserProfile> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as MyUserProfile;
      return {
        ...decoded,
        [securityId]: decoded.id,
        roles: decoded.roles || [],
      };
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  async generateToken(userProfile: MyUserProfile): Promise<string> {
    const {roles, ...rest} = userProfile;
    const payload = {
      ...rest,
      roles: userProfile.roles || ['Subscriber'],
    };
    return jwt.sign(payload, this.jwtSecret, {expiresIn: this.expiresIn});
  }
}
