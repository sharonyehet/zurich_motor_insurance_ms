import { BadRequestException, Injectable } from '@nestjs/common';
import {
    DataSource,
    FindOptionsWhere,
    Repository,
    UpdateResult,
} from 'typeorm';
import { UpdateProductRequestDto } from '../product-dtos/update-product.dto';
import { Product } from '../product-entities/product.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
    constructor(dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }

    getProduct(options: FindOptionsWhere<Product>): Promise<Product> {
        return this.findOneByOrFail({ ...options, isDeleted: false });
    }

    async addProduct(product: Product): Promise<Product> {
        const isExists = await this.existsBy({
            productCode: product.productCode,
            location: product.location,
            isDeleted: false,
        });

        if (isExists) {
            throw new BadRequestException('Product exists');
        }

        return this.save(product);
    }

    async updateProduct(
        productCode: string,
        dto: UpdateProductRequestDto,
    ): Promise<UpdateResult> {
        const isExists = await this.existsBy({
            productCode,
            location: dto.location,
            isDeleted: false,
        });

        if (!isExists) {
            throw new BadRequestException('Product not exists');
        }

        return this.update(
            {
                productCode,
                location: dto.location,
            },
            {
                price: dto.price,
            },
        );
    }

    async deleteProduct(productCode: string): Promise<UpdateResult> {
        const isExists = await this.existsBy({
            productCode,
            isDeleted: false,
        });

        if (!isExists) {
            throw new BadRequestException('Product not exists');
        }

        return this.update(
            {
                productCode,
            },
            { isDeleted: true, deletedAt: new Date() },
        );
    }
}
