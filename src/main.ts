import { NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";

async function start() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().setTitle("Codica ТЗ").setVersion("1.0.0").build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/docs", app, document);

    await app.listen(PORT);
}
start();
