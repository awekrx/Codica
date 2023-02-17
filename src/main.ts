import { NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import * as winstonDailyRotateFile from "winston-daily-rotate-file";

const transports = {
    console: new winston.transports.Console({
        level: "silly",
        format: winston.format.combine(
            winston.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss",
            }),
            winston.format.colorize({
                colors: {
                    info: "blue",
                    debug: "yellow",
                    error: "red",
                },
            }),
            winston.format.printf((info) => {
                return `${info.timestamp} [${info.level}] [${info.context ? info.context : info.stack}] ${
                    info.message
                }`;
            }),
        ),
    }),
    combinedFile: new winstonDailyRotateFile({
        dirname: "logs",
        filename: "combined",
        extension: ".log",
        level: "info",
    }),
    errorFile: new winstonDailyRotateFile({
        dirname: "logs",
        filename: "error",
        extension: ".log",
        level: "error",
    }),
};

async function start() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().setTitle("Codica ТЗ").setVersion("1.0.0").build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/docs", app, document);

    app.useLogger(
        WinstonModule.createLogger({
            format: winston.format.combine(
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.json(),
            ),
            transports: [transports.console, transports.combinedFile, transports.errorFile],
        }),
    );

    await app.listen(PORT);
}
start();
