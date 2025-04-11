"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
const serverConfig = () => ({
    config: {
        port: process.env.PORT,
        nodeEnv: process.env.NODE_ENV,
    },
});
exports.serverConfig = serverConfig;
//# sourceMappingURL=server.config.js.map