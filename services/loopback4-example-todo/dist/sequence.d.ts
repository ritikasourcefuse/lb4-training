import { AuthenticateFn } from '@loopback/authentication';
import { FindRoute, InvokeMethod, ParseParams, Reject, RequestContext, Send, SequenceHandler } from '@loopback/rest';
export declare class MySequence implements SequenceHandler {
    protected findRoute: FindRoute;
    protected parseParams: ParseParams;
    protected invoke: InvokeMethod;
    protected send: Send;
    protected reject: Reject;
    protected authenticateRequest: AuthenticateFn;
    constructor(findRoute: FindRoute, // Finds the appropriate controller method and arguments
    parseParams: ParseParams, // Parses request parameters
    invoke: InvokeMethod, // Invokes the resolved controller method
    send: Send, // Sends the response
    reject: Reject, // Handles errors
    authenticateRequest: AuthenticateFn);
    handle(context: RequestContext): Promise<void>;
}
