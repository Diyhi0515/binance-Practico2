import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import * as express from "express";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: "http://localhost:5173",
        credentials: true,
    });

    app.use("/uploads", express.static(join(__dirname, "..", "public", "uploads")));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
