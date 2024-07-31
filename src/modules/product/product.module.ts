import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
    providers: [ProductService, ProductRepository],
    controllers: [ProductController],
    imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
