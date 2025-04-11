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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
let BlogsService = class BlogsService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async create(addedBy, createBlogDto) {
        const { title, about, brief } = createBlogDto;
        return this.prisma.blog.create({
            data: {
                title,
                about,
                brief,
                addedBy,
            },
        });
    }
    findAll() {
        return this.prisma.blog.findMany({
            where: {
                isDeleted: false,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            select: {
                id: true,
                title: true,
                about: true,
                brief: true,
                addedBy: true,
                comments: true,
                likes: true,
                shares: true,
                views: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
    findOneById(id) {
        return this.prisma.blog.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
    }
    findOneByKeywords(searchString) {
        return this.prisma.blog.findFirst({
            where: {
                title: {
                    contains: searchString,
                },
                isDeleted: false,
            },
        });
    }
    update(id, updateBlogDto) {
        return this.prisma.blog.update({
            where: {
                id,
            },
            data: updateBlogDto,
        });
    }
    remove(id) {
        return this.prisma.blog.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
    }
};
BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], BlogsService);
exports.BlogsService = BlogsService;
//# sourceMappingURL=blogs.service.js.map