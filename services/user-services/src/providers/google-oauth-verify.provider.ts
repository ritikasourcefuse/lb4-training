import {Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {AuthErrorKeys, VerifyFunction} from 'loopback4-authentication';
import * as GoogleStrategy from 'passport-google-oauth20';

import {AuthUser} from '../models/auth-user.model';
import {UserCredentialsRepository, UserRepository} from '../repositories';
import {Tenant} from '../models/Tenant.model';

export class GoogleOauth2VerifyProvider
  implements Provider<VerifyFunction.GoogleAuthFn>
{
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserCredentialsRepository)
    public userCredsRepository: UserCredentialsRepository,
  ) {}

  value(): VerifyFunction.GoogleAuthFn {
    return async (
      accessToken: string,
      refreshToken: string,
      profile: GoogleStrategy.Profile,
    ) => {
      const user = await this.userRepository.findOne({
        where: {
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          email: (profile as any)._json.email,
        },
      });
      if (!user) {
        throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
      }
      console.log(user, 'dfsfsfdsfd');
      const creds = await this.userCredsRepository.findOne({
        where: {
          userId: user.id,
        },
      });
      console.log(creds, profile, 'credscreds');
      if (
        !creds ||
        creds.authProvider !== 'google' ||
        creds.authId !== profile.id
      ) {
        throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
      }

      const authUser: AuthUser = new AuthUser(user);
      authUser.permissions = [];
      authUser.externalAuthToken = accessToken;
      authUser.externalRefreshToken = refreshToken;
      authUser.tenant = new Tenant({id: user.defaultTenant});
      return authUser;
    };
  }
}
