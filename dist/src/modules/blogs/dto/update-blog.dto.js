"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogDto = void 0;
const openapi = require("@nestjs/swagger");
const create_blog_dto_1 = require("./create-blog.dto");
class UpdateBlogDto extends create_blog_dto_1.CreateBlogDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateBlogDto = UpdateBlogDto;
//# sourceMappingURL=update-blog.dto.js.map