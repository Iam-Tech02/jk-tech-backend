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
exports.validate = exports.Environment = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Production"] = "production";
    Environment["Test"] = "test";
    Environment["Provision"] = "provision";
})(Environment = exports.Environment || (exports.Environment = {}));
class EnvironmentVariables {
}
__decorate([
    (0, class_validator_1.IsEnum)(Environment),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DATABASE_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_EXPIRY", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_OAUTH_CLIENT_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_OAUTH_CLIENT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_OAUTH_REDIRECT_URI", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "FACEBOOK_OAUTH_CLIENT_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "FACEBOOK_OAUTH_CLIENT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "FACEBOOK_OAUTH_REDIRECT_URI", void 0);
function validate(config) {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
        stopAtFirstError: true,
        forbidUnknownValues: true,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
exports.validate = validate;
//# sourceMappingURL=env.validation.js.map