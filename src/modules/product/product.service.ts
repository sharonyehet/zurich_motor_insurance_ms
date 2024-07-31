import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonSuccessResponseDto } from 'src/common/dtos/common-response.dto';
import { AddProductRequestDto } from './dtos/add-product.dto';
import { GetProductResponseDto } from './dtos/get-product.dto';
import { UpdateProductRequestDto } from './dtos/update-product.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
    ) {}

    private logger = new Logger(ProductService.name);

    getProductPremium(
        productCode: string,
        location: string,
    ): Promise<GetProductResponseDto> {
        return this.productRepository
            .getProduct({
                productCode,
                location,
            })
            .then((product) => {
                return { premium: product.price };
            })
            .catch(() => {
                throw new NotFoundException();
            });
    }

    addProduct(dto: AddProductRequestDto): Promise<CommonSuccessResponseDto> {
        return this.productRepository
            .addProduct(this.productRepository.manager.create(Product, dto))
            .then(() => {
                return { success: true };
            })
            .catch((e) => {
                this.logger.error(e.stack);
                throw e;
            });
    }

    updateProduct(
        productCode: string,
        dto: UpdateProductRequestDto,
    ): Promise<CommonSuccessResponseDto> {
        return this.productRepository
            .updateProduct(productCode, dto)
            .then(() => {
                return { success: true };
            })
            .catch((e) => {
                this.logger.error(e.stack);
                throw e;
            });
    }

    deleteProduct(productCode: string): Promise<CommonSuccessResponseDto> {
        return this.productRepository
            .deleteProduct(productCode)
            .then(() => {
                return { success: true };
            })
            .catch((e) => {
                this.logger.error(e.stack);
                throw e;
            });
    }
}
