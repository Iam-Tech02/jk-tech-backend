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
exports.BrowserLoginDto = exports.LoginDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, maxLength: 100 }, email: { required: true, type: () => String, maxLength: 100, format: "email" }, id: { required: true, type: () => String, maxLength: 100 }, token: { required: true, type: () => String, maxLength: 100 } };
    }
}
__decorate([
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], UserDto.prototype, "token", void 0);
class LoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, maxLength: 100, format: "email" }, password: { required: true, type: () => String, maxLength: 100 } };
    }
}
__decorate([
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
exports.LoginDto = LoginDto;
class BrowserLoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { provider: { required: true, type: () => String, maxLength: 100 }, user: { required: true, type: () => UserDto } };
    }
}
__decorate([
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], BrowserLoginDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", UserDto)
], BrowserLoginDto.prototype, "user", void 0);
exports.BrowserLoginDto = BrowserLoginDto;
//# sourceMappingURL=login.dto.js.map