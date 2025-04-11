"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const configurations_1 = require("./configurations");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const app_config_1 = require("./configurations/app.config");
const core_1 = require("@nestjs/core");
const jwt_guard_1 = require("./modules/auth/guards/jwt.guard");
const blogs_module_1 = require("./modules/blogs/blogs.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['local.env', 'development.env', 'production.env', '.env'],
                isGlobal: true,
                load: [configurations_1.serverConfig, app_config_1.appConfig],
                cache: true,
                validate: configurations_1.validate,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            blogs_module_1.BlogsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    transform: true,
                    stopAtFirstError: true,
                    whitelist: true,
                    forbidUnknownValues: true,
                    forbidNonWhitelisted: true,
                }),
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JwtGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map