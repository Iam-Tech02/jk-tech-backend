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
exports.BlogsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const messages_constant_1 = require("../../common/constants/messages.constant");
const swagger_1 = require("@nestjs/swagger");
const blogs_service_1 = require("./blogs.service");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const find_all_blogs_dto_1 = require("./dto/find-all-blogs.dto");
const update_blog_dto_1 = require("./dto/update-blog.dto");
const decorators_1 = require("../../common/decorators");
let BlogsController = class BlogsController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    async create(createBlogDto, user) {
        await this.blogsService.create(user.id, createBlogDto);
        return {
            message: messages_constant_1.messagesConstant.ADD_BLOG_RESPONSE,
        };
    }
    async findAll(queryParams) {
        const result = await this.blogsService.findAll();
        return {
            result,
            message: messages_constant_1.messagesConstant.BLOGS_FETCHED,
        };
    }
    async findOne(id) {
        const blog = await this.blogsService.findOneById(id);
        if (!blog) {
            throw new common_1.NotFoundException(messages_constant_1.messagesConstant.BLOG_NOT_FOUND);
        }
        return {
            message: messages_constant_1.messagesConstant.BLOG_FETCHED,
            result: blog,
        };
    }
    async update(id, updateBlogDto) {
        const blog = await this.blogsService.findOneById(id);
        if (!blog) {
            throw new common_1.NotFoundException(messages_constant_1.messagesConstant.BLOG_NOT_FOUND);
        }
        await this.blogsService.update(id, updateBlogDto);
        return {
            message: messages_constant_1.messagesConstant.BLOG_UPDATED,
        };
    }
    async remove(id) {
        const blog = await this.blogsService.findOneById(id);
        if (!blog) {
            throw new common_1.NotFoundException(messages_constant_1.messagesConstant.BLOG_NOT_FOUND);
        }
        await this.blogsService.remove(id);
        return {
            message: messages_constant_1.messagesConstant.BLOG_DELETED,
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "create", null);
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
    __metadata("design:paramtypes", [find_all_blogs_dto_1.FindAllBlogsDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_blog_dto_1.UpdateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "remove", null);
BlogsController = __decorate([
    (0, swagger_1.ApiTags)('Blogs'),
    (0, common_1.Controller)({
        path: 'blogs',
        version: '1',
    }),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsController);
exports.BlogsController = BlogsController;
//# sourceMappingURL=blogs.controller.js.map