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
import {inject} from '@loopback/core';

export class MySequence implements SequenceHandler {
  constructor(
    @inject(RestBindings.SequenceActions.FIND_ROUTE)
    protected findRoute: FindRoute, // Finds the appropriate controller method and arguments

    @inject(RestBindings.SequenceActions.PARSE_PARAMS)
    protected parseParams: ParseParams, // Parses request parameters

    @inject(RestBindings.SequenceActions.INVOKE_METHOD)
    protected invoke: InvokeMethod, // Invokes the resolved controller method

    @inject(RestBindings.SequenceActions.SEND)
    protected send: Send, // Sends the response

    @inject(RestBindings.SequenceActions.REJECT)
    protected reject: Reject, // Handles errors

    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn, // Performs authentication
  ) {}

  async handle(context: RequestContext): Promise<void> {
    try {
      const {request, response} = context;

      // Find the appropriate route
      const route = this.findRoute(request);

      // Call authentication
      await this.authenticateRequest(request);

      // Parse parameters
      const args = await this.parseParams(request, route);

      // Invoke the controller method
      const result = await this.invoke(route, args);

      // Send the result
      this.send(response, result);
    } catch (error) {
      // Handle authentication errors
      if (
        error.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        error.code === USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(error, {statusCode: 401}); // Unauthorized
      }

      // Reject the request with an error
      this.reject(context, error);
    }
  }
}
