import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {DbDataSource} from 'shared';
import {
  AuthenticationBindings,
  AuthenticationComponent,
  ClientPasswordVerifyProvider,
  Strategies,
} from 'loopback4-authentication';
import {User} from './models/user.model';
import {GoogleOauth2VerifyProvider} from './providers/google-oauth-verify.provider';
import {GoogleAuthStrategyFactoryProvider} from 'loopback4-authentication/passport-google-oauth2';
import {
  AuthorizationBindings,
  AuthorizationComponent,
} from 'loopback4-authorization';

export {ApplicationConfig};

export class UserServicesApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);
    this.bind('datasources.db').toClass(DbDataSource);
    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // this.bind(TokenServiceBindings.SERVICE).toClass(JWTService);

    // // Bind the JWT secret (ensure it's in your environment or configuration)
    // this.bind(TokenServiceBindings.SECRET).to('your_jwt_secret_key');

    // // Bind the JWT expiration time
    // this.bind(TokenServiceBindings.EXPIRES_IN).to('1h');
    this.component(AuthenticationComponent);
    this.bind(AuthenticationBindings.USER_MODEL).to(User);
    this.bind('sf.userAuthentication.currentUser').to(User);
    this.bind(Strategies.Passport.OAUTH2_CLIENT_PASSWORD_VERIFIER).toProvider(
      ClientPasswordVerifyProvider,
    );
    this.bind(Strategies.Passport.GOOGLE_OAUTH2_VERIFIER).toProvider(
      GoogleOauth2VerifyProvider,
    );
    this.bind(
      Strategies.Passport.GOOGLE_OAUTH2_STRATEGY_FACTORY.key,
    ).toProvider(GoogleAuthStrategyFactoryProvider);
    this.bind(AuthorizationBindings.CONFIG).to({
      allowAlwaysPaths: ['/explorer'],
    });
    this.component(AuthorizationComponent);
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
