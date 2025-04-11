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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const messages_constant_1 = require("../../common/constants/messages.constant");
const find_all_users_dto_1 = require("./dto/find-all-users.dto");
const swagger_1 = require("@nestjs/swagger");
const role_service_1 = require("./role/role.service");
let UsersController = class UsersController {
    constructor(usersService, roleService) {
        this.usersService = usersService;
        this.roleService = roleService;
    }
    async create(createUserDto) {
        const role = await this.roleService.getOneById(createUserDto.roleId);
        if (!role) {
            throw new common_1.BadRequestException(messages_constant_1.messagesConstant.INVALID_ROLE_ID);
        }
        const user = await this.usersService.findOneByEmail(createUserDto.email);
        if (user) {
            throw new common_1.ConflictException(messages_constant_1.messagesConstant.USER_ALREADY_EXISTS);
        }
        await this.usersService.create(createUserDto);
        return {
            message: messages_constant_1.messagesConstant.ADD_USER_RESPONSE,
        };
    }
    async findAll(queryParams) {
        const { page } = queryParams;
        const result = await this.usersService.findAll(page);
        return {
            result,
            message: messages_constant_1.messagesConstant.USERS_FETCHED,
        };
    }
    async findOne(id) {
        const user = await this.usersService.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException(messages_constant_1.messagesConstant.USER_NOT_FOUND);
        }
        return {
            message: messages_constant_1.messagesConstant.USER_FETCHED,
            result: user,
        };
    }
    async update(id, updateUserDto) {
        const user = await this.usersService.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException(messages_constant_1.messagesConstant.USER_NOT_FOUND);
        }
        if (updateUserDto.roleId) {
            const role = await this.roleService.getOneById(updateUserDto.roleId);
            if (!role) {
                throw new common_1.BadRequestException(messages_constant_1.messagesConstant.INVALID_ROLE_ID);
            }
        }
        await this.usersService.update(id, updateUserDto);
        return {
            message: messages_constant_1.messagesConstant.USER_UPDATED,
        };
    }
    async remove(id) {
        const user = await this.usersService.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException(messages_constant_1.messagesConstant.USER_NOT_FOUND);
        }
        await this.usersService.remove(id);
        return {
            message: messages_constant_1.messagesConstant.USER_DELETED,
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_users_dto_1.FindAllUsersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)({
        path: 'users',
        version: '1',
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        role_service_1.RoleService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map