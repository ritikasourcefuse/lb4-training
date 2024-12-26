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
import {
  AuthorizationBindings,
  JWTService,
  LoggingInterceptor,
  RoleBasedAuthorizerProvider,
  TokenServiceBindings,
} from 'shared';

export {ApplicationConfig};

export class GatewayServicesApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);
    this.interceptor(LoggingInterceptor);
    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    this.bind(AuthorizationBindings.PROVIDER).toProvider(
      RoleBasedAuthorizerProvider,
    );
    this.bind(TokenServiceBindings.SECRET).to('myjwtsecret');
    this.bind(TokenServiceBindings.EXPIRES_IN).to('3600'); // 1 hour
    this.bind(TokenServiceBindings.SERVICE).toClass(JWTService);

    // Bind Authorization Provider
    this.bind(AuthorizationBindings.PROVIDER).toClass(
      RoleBasedAuthorizerProvider,
    );

    console.log('LoggingInterceptor registered');

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
