import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseMappingInterceptor } from './common/interceptors/response-mapping.interceptor';
import { AuthMiddleware } from './common/middlewares/authentication.middleware';
import { DATA_SOURCE_OPTIONS } from './configs/typeorm.config';
import { ProductModule } from './modules/product/product.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(DATA_SOURCE_OPTIONS),
        ProductModule,
        JwtModule.register({
            global: true,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseMappingInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).exclude('/token').forRoutes('*');
    }
}
