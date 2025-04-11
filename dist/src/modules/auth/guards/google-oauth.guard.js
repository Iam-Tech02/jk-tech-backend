"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
(0, common_1.Injectable)();
class GoogleOAuthGuard extends (0, passport_1.AuthGuard)('google') {
    constructor() {
        super({
            accessType: 'offline',
        });
    }
}
exports.GoogleOAuthGuard = GoogleOAuthGuard;
//# sourceMappingURL=google-oauth.guard.js.map