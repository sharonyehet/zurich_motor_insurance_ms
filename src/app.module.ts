import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseMappingInterceptor } from './common/interceptors/response-mapping.interceptor';
import { DATA_SOURCE_OPTIONS } from './configs/typeorm.config';
import { ProductModule } from './modules/product/product.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(DATA_SOURCE_OPTIONS),
        ProductModule,
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
export class AppModule {}
