"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const openapi = require("@nestjs/swagger");
class Role {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
}
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map