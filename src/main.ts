import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api/');
    const config = new DocumentBuilder()
        .setTitle('Zurich Motor Insurance')
        .setDescription('Zurich Motor Insurance API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: {
            tagsSorter: 'alpha',
        },
    });

    await app.listen(3000);
}
bootstrap();
