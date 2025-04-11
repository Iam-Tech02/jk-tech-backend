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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt_1 = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async create(createUserDto) {
        const password = await this.generatePasswordHash(createUserDto.password);
        const user = Object.assign(Object.assign({}, createUserDto), { password });
        return this.prisma.user.create({
            data: user,
        });
    }
    async generatePasswordHash(plainPassword) {
        const saltRounds = this.configService.getOrThrow('bcrypt.saltRounds');
        const salt = await (0, bcrypt_1.genSalt)(saltRounds);
        return (0, bcrypt_1.hash)(plainPassword, salt);
    }
    findAll(pageNumber) {
        const usersFetchLimit = this.configService.getOrThrow('users.findAll.limit');
        return this.prisma.user.findMany({
            where: {
                isDeleted: false,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            select: {
                id: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
            take: usersFetchLimit,
            skip: (pageNumber - 1) * usersFetchLimit,
        });
    }
    findOneById(id) {
        return this.prisma.user.findFirst({
            where: {
                id,
                isDeleted: false,
            },
            select: {
                email: true,
                id: true,
                name: true,
                role: true,
                isVerified: true,
            },
        });
    }
    findOneByEmail(email, sensitiveInfo = false) {
        return this.prisma.user.findFirst({
            where: {
                email,
                isDeleted: false,
            },
            select: {
                email: true,
                id: true,
                name: true,
                role: true,
                isVerified: true,
                password: sensitiveInfo,
            },
        });
    }
    saveOAuthUser(email, name, isVerified = false) {
        const defaultRoleId = this.configService.getOrThrow('users.defaultRoleId');
        return this.prisma.user.create({
            data: {
                email,
                name,
                roleId: defaultRoleId,
                isVerified,
            },
            select: {
                email: true,
                id: true,
                name: true,
                role: true,
                isVerified: true,
            },
        });
    }
    update(id, updateUserDto) {
        return this.prisma.user.update({
            where: {
                id,
            },
            data: updateUserDto,
        });
    }
    remove(id) {
        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map