import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {
  get,
  HttpErrors,
  param,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import {
  authenticate,
  authenticateClient,
  AuthenticationBindings,
  AuthErrorKeys,
  ClientAuthCode,
  STRATEGY,
} from 'loopback4-authentication';
import {AuthUser} from '../models/auth-user.model';
import {
  AuthClientRepository,
  TokenResponse,
  UserRepository,
} from '../repositories';
import {AuthClient} from '../models/auth-client.model';
import {User} from '../models/user.model';
import {authorize} from 'loopback4-authorization';

export const enum STATUS_CODE {
  OK = 200,
  CREATED,
}
export const CONTENT_TYPE = {
  JSON: 'application/json',
};

export class LoginController {
  // sonarignore_start
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER)
    private readonly user: AuthUser | undefined,
    @repository(AuthClientRepository)
    public authClientRepository: AuthClientRepository,
    @repository(UserRepository)
    public userRepo: UserRepository,
  ) {}
  // sonarignore_end

  @authenticateClient(STRATEGY.CLIENT_PASSWORD)
  @authenticate(
    STRATEGY.GOOGLE_OAUTH2,
    {
      accessType: 'offline',
      scope: ['profile', 'email'],
      authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
      callbackURL: 'http://127.0.0.1:4000/auth/google-auth-redirect',
      clientID:
        '1054739634248-u09tpr88fvb3vv63d5l6t9hd7jh0bu52.apps.googleusercontent.com',
      clientSecret: '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',
      tokenURL: 'https://oauth2.googleapis.com/token',
    },
    (req: Request) => {
      return {
        accessType: 'offline',
        state: Object.keys(req.query)
          .map(key => key + '=' + req.query[key])
          .join('&'),
      };
    },
  )
  @authorize({permissions: ['*']})
  @get('/auth/google', {
    responses: {
      [STATUS_CODE.OK]: {
        description: 'Token Response',
        content: {
          [CONTENT_TYPE.JSON]: {
            schema: {'x-ts-type': TokenResponse},
          },
        },
      },
    },
  })
  async loginViaGoogle(
    @param.query.string('client_id')
    clientId?: string,
    @param.query.string('client_secret')
    clientSecret?: string,
  ): Promise<void> {}

  @authenticate(
    STRATEGY.GOOGLE_OAUTH2,
    {
      accessType: 'offline',
      scope: ['profile', 'email'],
      authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
      callbackURL: 'http://127.0.0.1:4000/auth/google-auth-redirect',
      clientID:
        '1054739634248-u09tpr88fvb3vv63d5l6t9hd7jh0bu52.apps.googleusercontent.com',
      clientSecret: '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',
      tokenURL: 'https://oauth2.googleapis.com/token',
      //   tokenURL: process.env.GOOGLE_AUTH_TOKEN_URL,
    },
    (req: Request) => {
      return {
        accessType: 'offline',
        state: Object.keys(req.query)
          .map(key => `${key}=${req.query[key]}`)
          .join('&'),
      };
    },
  )
  @authorize({permissions: ['*']})
  @get('/auth/google-auth-redirect', {
    responses: {
      [STATUS_CODE.OK]: {
        description: 'Token Response',
        content: {
          [CONTENT_TYPE.JSON]: {
            schema: {'x-ts-type': TokenResponse},
          },
        },
      },
    },
  })
  async googleCallback(
    @param.query.string('code') code: string,
    @param.query.string('state') state: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<void> {
    console.log('Google OAuth callback invoked with code:', code);
    const clientId = new URLSearchParams(state).get('client_id');
    console.log(clientId, this.user, 'cclientId');

    if (!clientId || !this.user) {
      throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
    }
    const client = await this.authClientRepository.findOne({
      where: {
        clientId: clientId,
      },
    });
    console.log(client, 'clientclientclient');
    // response.send(client);

    if (!client?.redirectUrl) {
      throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
    }
    try {
      const codePayload: ClientAuthCode<User> = {
        clientId,
        user: this.user,
      };
      console.log(codePayload, 'codePayload');
      const token = jwt.sign(codePayload, client.secret, {
        expiresIn: '1h', //client.authCodeExpiration,
        audience: clientId,
        subject: this.user.username,
        issuer: 'lb4', // process.env.JWT_ISSUER,
      });

      // console.log(token);
      response.json({token});
    } catch (error) {
      throw new HttpErrors.InternalServerError(AuthErrorKeys.UnknownError);
    }
  }
}
