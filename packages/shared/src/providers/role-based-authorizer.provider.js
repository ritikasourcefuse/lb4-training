"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleBasedAuthorizerProvider = void 0;
const tslib_1 = require("tslib");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
let RoleBasedAuthorizerProvider = class RoleBasedAuthorizerProvider {
    value() {
        return async (context, metadata) => {
            var _a, _b, _c;
            const userRoles = ((_b = (_a = context.principals) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.roles) || [];
            console.log('User Roles:', userRoles);
            console.log('Allowed Roles:', metadata.allowedRoles);
            if ((_c = metadata.allowedRoles) === null || _c === void 0 ? void 0 : _c.some(role => userRoles.includes(role))) {
                console.log('Authorization Decision: ALLOW');
                return authorization_1.AuthorizationDecision.ALLOW;
            }
            console.log('Authorization Decision: DENY');
            return authorization_1.AuthorizationDecision.DENY;
        };
    }
};
exports.RoleBasedAuthorizerProvider = RoleBasedAuthorizerProvider;
exports.RoleBasedAuthorizerProvider = RoleBasedAuthorizerProvider = tslib_1.__decorate([
    (0, core_1.injectable)()
], RoleBasedAuthorizerProvider);
//# sourceMappingURL=role-based-authorizer.provider.js.map