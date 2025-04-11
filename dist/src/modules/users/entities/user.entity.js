"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const openapi = require("@nestjs/swagger");
class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, isVerified: { required: true, type: () => Boolean }, role: { required: false, type: () => require("../../roles/entities/role.entity").Role }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map