import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger();
    const configService = app.get(ConfigService);
    const version = process.env.VERSION ?? configService.get("VERSION");
    const port = +process.env.API_PORT ?? +configService.get("API_PORT");
    const environment = process.env.NODE_ENV;
    const config = new DocumentBuilder()
      .setTitle(`Shop Portal ${environment}`)
      .setDescription("The Shop Portal API description")
      .setVersion(`v${version}`)
      .addTag("Shop Portal")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("", app, document);
    app.enableCors({
      origin: true,
      methods: "*",
      credentials: true,
    });
    await app.listen(port);
    logger.log(`Application listening on version ${version}`);
    logger.log(`Application listening on port ${port}`);
    logger.log(`Application listening on ENV ${environment}`);
  } catch (error) {
    console.log(`Application catch error msg ! ${error.message ?? ""}`);
  }
}
bootstrap();
