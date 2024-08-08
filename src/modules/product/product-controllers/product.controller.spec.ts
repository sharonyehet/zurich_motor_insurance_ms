import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product-services/product.service';
import { ProductController } from './product.controller';

describe('ProductController', () => {
    let controller: ProductController;
    let service: ProductService;

    beforeEach(async () => {
        const mockProductService = {
            getProductPremium: jest.fn(),
            addProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                { provide: ProductService, useValue: mockProductService },
            ],
        }).compile();

        controller = module.get<ProductController>(ProductController);
        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should get premium of product in specified location', async () => {
        const result = { premium: 100 };
        service.getProductPremium = jest.fn().mockResolvedValue(result);
        expect(
            await controller.getProduct({
                productCode: '1000',
                location: 'Malaysia',
            }),
        ).toEqual(result);
    });

    it('should add a new product with success', async () => {
        service.addProduct = jest.fn().mockResolvedValue({ success: true });
        expect(
            await controller.addProduct({
                productCode: '1000',
                price: 100.5,
                location: 'Malaysia',
            }),
        ).toEqual({ success: true });
    });

    it('should update a product with success', async () => {
        service.updateProduct = jest.fn().mockResolvedValue({ success: true });
        expect(
            await controller.updateProduct(
                { productCode: '1000' },
                {
                    price: 100.5,
                    location: 'Malaysia',
                },
            ),
        ).toEqual({ success: true });
    });

    it('should delete a product with success', async () => {
        service.deleteProduct = jest.fn().mockResolvedValue({ success: true });
        expect(await controller.deleteProduct({ productCode: '1000' })).toEqual(
            { success: true },
        );
    });
});
