import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingScope} from '@loopback/core';
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
import {AuthenticationComponent} from 'loopback4-authentication';

export {ApplicationConfig};

export class ProductServicesApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.bind('datasources.db').toClass(DbDataSource);

    // Set up default home page
    this.sequence(MySequence);
    this.static('/', path.join(__dirname, '../public'));
    this.component(AuthenticationComponent);

    // this.bind('services.JWTService').toClass(JWTService);

    // // Bind the JWT service
    // this.bind(TokenServiceBindings.SERVICE).toClass(JWTService);
    // // Bind the JWT secret
    // this.bind(TokenServiceBindings.SECRET).to('your_jwt_secret_key');

    // // Bind the JWT expiration time
    // this.bind(TokenServiceBindings.EXPIRES_IN).to('1h');

    // // Add the authentication component
    // this.component(AuthenticationComponent);
    // // Register the JWT authentication strategy
    // registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

    // // Authorization setup
    // this.component(AuthorizationComponent);
    // this.bind('authorizationProviders.role-based-authorizer')
    //   .toProvider(RoleBasedAuthorizerProvider)
    //   .tag(AuthorizationTags.AUTHORIZER);

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });

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
