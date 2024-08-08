import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateResult } from 'typeorm';
import { AddProductRequestDto } from '../product-dtos/add-product.dto';
import { UpdateProductRequestDto } from '../product-dtos/update-product.dto';
import { Product } from '../product-entities/product.entity';
import { ProductRepository } from '../product-repositories/product.repository';
import { ProductService } from './product.service';

describe('ProductService', () => {
    let service: ProductService;
    let repository: ProductRepository;

    const mockRes: Product = {
        id: 1,
        productCode: '1000',
        productDescription: '',
        location: 'East Malaysia',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        deletedAt: undefined,
    };

    beforeEach(async () => {
        const mockProductRepository = {
            getProduct: jest.fn(),
            addProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
            manager: {
                create: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: ProductRepository,
                    useValue: mockProductRepository,
                },
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
        repository = module.get<ProductRepository>(ProductRepository);
        repository.manager.create = jest.fn().mockReturnValue(mockRes);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get premium of product in specified location', async () => {
        repository.getProduct = jest.fn().mockResolvedValue(mockRes);

        const res = await service.getProductPremium('1000', 'East Malaysia');

        expect(res).toEqual({ premium: mockRes.price });
    });

    it('should throw NotFoundException when a product / location not existed during get premium', async () => {
        repository.getProduct = jest
            .fn()
            .mockRejectedValue(new Error('Not Found'));

        await expect(
            service.getProductPremium('1000', 'Malaysia'),
        ).rejects.toThrow(NotFoundException);
    });

    it('should add a product with success', async () => {
        const mockProductDto: AddProductRequestDto = {
            productCode: '1000',
            location: 'East Malaysia',
            price: 100,
        };

        repository.addProduct = jest.fn().mockResolvedValue(mockRes);

        const res = await service.addProduct(mockProductDto);

        expect(res).toEqual({ success: true });
    });

    it('should throw error when add product failed', async () => {
        const mockProductDto: AddProductRequestDto = {
            productCode: '1000',
            location: 'East Malaysia',
            price: 100,
        };

        repository.addProduct = jest
            .fn()
            .mockRejectedValue(new BadRequestException());

        await expect(service.addProduct(mockProductDto)).rejects.toThrow(
            BadRequestException,
        );
    });

    it('should update a product with success', async () => {
        const mockProductDto: UpdateProductRequestDto = {
            location: 'East Malaysia',
            price: 120,
        };

        repository.updateProduct = jest
            .fn()
            .mockResolvedValue(new UpdateResult());

        const res = await service.updateProduct('1000', mockProductDto);

        expect(res).toEqual({ success: true });
    });

    it('should throw error when update product failed', async () => {
        const mockProductDto: UpdateProductRequestDto = {
            location: 'East Malaysia',
            price: 120,
        };

        repository.updateProduct = jest
            .fn()
            .mockRejectedValue(new BadRequestException());

        await expect(
            service.updateProduct('1000', mockProductDto),
        ).rejects.toThrow(BadRequestException);
    });

    it('should delete a product with success', async () => {
        repository.deleteProduct = jest
            .fn()
            .mockResolvedValue(new UpdateResult());

        const res = await service.deleteProduct('1000');

        expect(res).toEqual({ success: true });
    });

    it('should throw error when delete product failed', async () => {
        repository.deleteProduct = jest
            .fn()
            .mockRejectedValue(new BadRequestException());

        await expect(service.deleteProduct('1000')).rejects.toThrow(
            BadRequestException,
        );
    });
});
