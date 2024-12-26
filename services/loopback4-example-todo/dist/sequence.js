"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySequence = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const rest_1 = require("@loopback/rest");
const core_1 = require("@loopback/core");
let MySequence = class MySequence {
    constructor(findRoute, parseParams, invoke, send, reject, authenticateRequest) {
        this.findRoute = findRoute;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
        this.authenticateRequest = authenticateRequest;
    }
    async handle(context) {
        try {
            const { request, response } = context;
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
        }
        catch (error) {
            // Handle authentication errors
            if (error.code === authentication_1.AUTHENTICATION_STRATEGY_NOT_FOUND ||
                error.code === authentication_1.USER_PROFILE_NOT_FOUND) {
                Object.assign(error, { statusCode: 401 }); // Unauthorized
            }
            // Reject the request with an error
            this.reject(context, error);
        }
    }
};
exports.MySequence = MySequence;
exports.MySequence = MySequence = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(rest_1.RestBindings.SequenceActions.FIND_ROUTE)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.SequenceActions.PARSE_PARAMS)),
    tslib_1.__param(2, (0, core_1.inject)(rest_1.RestBindings.SequenceActions.INVOKE_METHOD)),
    tslib_1.__param(3, (0, core_1.inject)(rest_1.RestBindings.SequenceActions.SEND)),
    tslib_1.__param(4, (0, core_1.inject)(rest_1.RestBindings.SequenceActions.REJECT)),
    tslib_1.__param(5, (0, core_1.inject)(authentication_1.AuthenticationBindings.AUTH_ACTION)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Function, Function, Function])
], MySequence);
//# sourceMappingURL=sequence.js.map