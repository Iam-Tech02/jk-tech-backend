"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const google_oauth_guard_1 = require("./guards/google-oauth.guard");
const facebook_oauth_guard_1 = require("./guards/facebook-oauth.guard");
const google_auth_library_1 = require("google-auth-library");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(payload) {
        const { email, password } = payload;
        const result = await this.authService.login(email, password);
        return result;
    }
    async googleOAuthLogin() { }
    async googleOAuthRedirect(googleUser) {
        let user = await this.userService.findOneByEmail(googleUser.email);
        let userId = user === null || user === void 0 ? void 0 : user.id;
        if (!user) {
            user = (await this.userService.saveOAuthUser(googleUser.email, googleUser.name, true));
            userId = user.id;
        }
        const access_token = await this.authService.signJwt(userId, user.role.name);
        return {
            access_token,
        };
    }
    async facebookOAuthLogin() { }
    async facebookOAuthRedirect(facebookUser) {
        let user = await this.userService.findOneByEmail(facebookUser.email);
        let userId = user === null || user === void 0 ? void 0 : user.id;
        if (!user) {
            user = (await this.userService.saveOAuthUser(facebookUser.email, facebookUser.name, true));
            userId = user.id;
        }
        const access_token = await this.authService.signJwt(userId, user.role.name);
        return {
            access_token,
        };
    }
    async browserLogin(payload) {
        const { provider, user } = payload;
        await this.verifyToken(provider, user);
        const foundUser = await this.userService.findOneByEmail(user.email);
        let userId;
        let roleName;
        if (!foundUser) {
            const savedUser = await this.userService.saveOAuthUser(user.email, user.name, true);
            userId = savedUser.id;
            roleName = savedUser.role.name;
        }
        else {
            userId = foundUser.id;
            roleName = foundUser.role.name;
        }
        const access_token = await this.authService.signJwt(userId, roleName);
        return {
            access_token,
            user: {
                id: userId,
                email: user.email,
                name: user.name,
                role: roleName
            }
        };
    }
    async verifyToken(provider, user) {
        switch (provider) {
            case 'google':
                const oauth = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
                await oauth.verifyIdToken({
                    idToken: user.token,
                });
                break;
            case 'facebook':
                const profile = await (await fetch(`https://graph.facebook.com/${user.id}?access_token=${user.token}`)).json();
                if (profile.error) {
                    throw new common_1.UnauthorizedException();
                }
                break;
            default:
                throw new common_1.UnauthorizedException('Invalid Provider');
        }
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOAuthGuard),
    (0, common_1.Get)('google/login'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleOAuthLogin", null);
__decorate([
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOAuthGuard),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, decorators_1.Public)(),
    (0, common_1.Get)('google/redirect'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleOAuthRedirect", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(facebook_oauth_guard_1.FacebookOAuthGuard),
    (0, common_1.Get)('facebook/login'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookOAuthLogin", null);
__decorate([
    (0, common_1.UseGuards)(facebook_oauth_guard_1.FacebookOAuthGuard),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, decorators_1.Public)(),
    (0, common_1.Get)('facebook/redirect'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookOAuthRedirect", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/browser/login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.BrowserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "browserLogin", null);
AuthController = __decorate([
    (0, common_1.Controller)({
        path: 'auth',
        version: '1',
    }),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map