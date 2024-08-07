"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use(cookieParser());
    app.use(session({
        secret: 'wqdsdsf123',
        resave: false,
        saveUninitialized: false,
    }));
    dotenv.config();
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept , Authorization , X-XSRF-TOKEN',
        credentials: true,
    });
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map