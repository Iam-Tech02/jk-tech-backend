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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(email, plainPassword) {
        const nullableUser = await this.userService.findOneByEmail(email, true);
        const user = this.isEntityFound(nullableUser);
        if (!(user === null || user === void 0 ? void 0 : user.password)) {
            throw new common_1.UnauthorizedException();
        }
        await this.matchPassword(user.password, plainPassword);
        const access_token = await this.signJwt(user.id, user.role.name);
        return {
            access_token,
        };
    }
    getJwtSecret() {
        return this.configService.getOrThrow('jwt.secret');
    }
    getJwtExpiry() {
        return this.configService.getOrThrow('jwt.expiry');
    }
    async matchPassword(hashedPassword, plainPassword) {
        const isMatch = await (0, bcrypt_1.compare)(plainPassword, hashedPassword);
        if (!isMatch) {
            throw new common_1.UnauthorizedException();
        }
    }
    isEntityFound(entity) {
        if (!entity) {
            throw new common_1.NotFoundException();
        }
        return entity;
    }
    getJwtSignOptions() {
        const jwtSecret = this.getJwtSecret();
        const jwtExpiry = this.getJwtExpiry();
        return {
            secret: jwtSecret,
            expiresIn: jwtExpiry,
        };
    }
    makeJwtPayload(id, role) {
        return { id, role };
    }
    signJwt(userId, role) {
        const payload = this.makeJwtPayload(userId, role);
        const JwtSignOptions = this.getJwtSignOptions();
        return this.jwtService.signAsync(payload, JwtSignOptions);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map