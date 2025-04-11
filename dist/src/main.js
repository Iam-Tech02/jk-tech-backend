"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const configurations_1 = require("./configurations");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:4200',
            'http://localhost:64360',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.setGlobalPrefix('api');
    const configService = app.get(config_1.ConfigService);
    const { port, nodeEnv } = configService.getOrThrow('config');
    if (nodeEnv == configurations_1.Environment.Development) {
        const swaggerConfig = configService.getOrThrow('swagger');
        const config = new swagger_1.DocumentBuilder()
            .setTitle(swaggerConfig.title)
            .setVersion(swaggerConfig.version)
            .addBearerAuth()
            .addSecurityRequirements('bearer')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup(swaggerConfig.path, app, document);
    }
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map