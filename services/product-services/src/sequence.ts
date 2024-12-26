import {
  AuthenticateFn,
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  AuthenticationBindings,
  USER_PROFILE_NOT_FOUND,
} from '@loopback/authentication';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import {
  AuthorizationBindings,
  AuthorizationComponent,
  AuthorizationTags,
} from '@loopback/authorization';
import {inject} from '@loopback/core';

export class MySequence implements SequenceHandler {
  constructor(
    @inject(RestBindings.SequenceActions.FIND_ROUTE)
    protected findRoute: FindRoute,

    @inject(RestBindings.SequenceActions.PARSE_PARAMS)
    protected parseParams: ParseParams,

    @inject(RestBindings.SequenceActions.INVOKE_METHOD)
    protected invoke: InvokeMethod,

    @inject(RestBindings.SequenceActions.SEND)
    protected send: Send,

    @inject(RestBindings.SequenceActions.REJECT)
    protected reject: Reject,

    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,

    @inject(AuthorizationBindings.COMPONENT)
    protected authorizationComponent: any, // Inject the authorizer function
  ) {}

  async handle(context: RequestContext): Promise<void> {
    try {
      const {request, response} = context;

      // Find the appropriate route
      const route = this.findRoute(request);

      // Call authentication
      const userProfile = await this.authenticateRequest(request);

      // Parse parameters
      const args = await this.parseParams(request, route);

      // Invoke the controller method
      const result = await this.invoke(route, args);

      // Send the result
      this.send(response, result);
    } catch (error) {
      // Handle authentication/authorization errors
      if (
        error.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        error.code === USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(error, {statusCode: 401}); // Unauthorized
      } else if (error.code === 'AUTHORIZATION_FAILED') {
        Object.assign(error, {statusCode: 403}); // Forbidden
      }

      // Reject the request with an error
      this.reject(context, error);
    }
  }
}
