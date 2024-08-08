import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product-controllers/product.controller';
import { Product } from './product-entities/product.entity';
import { ProductRepository } from './product-repositories/product.repository';
import { ProductService } from './product-services/product.service';

@Module({
    providers: [ProductService, ProductRepository],
    controllers: [ProductController],
    imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
