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
exports.FindAllUsersDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FindAllUsersDto {
    constructor() {
        this.page = 1;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { page: { required: true, type: () => Object, default: 1, minimum: 1, maximum: Infinity } };
    }
}
__decorate([
    (0, class_validator_1.Max)(Infinity),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        return Number(value);
    }),
    __metadata("design:type", Object)
], FindAllUsersDto.prototype, "page", void 0);
exports.FindAllUsersDto = FindAllUsersDto;
//# sourceMappingURL=find-all-users.dto.js.map