import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, UpdateResult } from 'typeorm';
import { Product } from '../product-entities/product.entity';
import { ProductRepository } from '../product-repositories/product.repository';

describe('ProductRepository', () => {
    let repository: ProductRepository;
    const dataSource = {
        createEntityManager: jest.fn(),
    };

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
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductRepository,
                {
                    provide: DataSource,
                    useValue: dataSource,
                },
            ],
        }).compile();

        repository = module.get<ProductRepository>(ProductRepository);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    it('should get product by code & location', async () => {
        const conditions = {
            productCode: '1000',
            location: 'East Malaysia',
        };

        const findOneByOrFailSpy = jest
            .spyOn(repository, 'findOneByOrFail')
            .mockResolvedValue(mockRes);

        const foundProduct = await repository.getProduct(conditions);

        expect(foundProduct).toEqual(mockRes);
        expect(findOneByOrFailSpy).toHaveBeenCalledWith({
            ...conditions,
            isDeleted: false,
        });
    });

    it('should throw error when get product not existed', async () => {
        const conditions = {
            productCode: '1000',
            location: 'East Malaysia',
        };

        const findOneByOrFailSpy = jest
            .spyOn(repository, 'findOneByOrFail')
            .mockRejectedValue(new Error());

        await expect(repository.getProduct(conditions)).rejects.toThrow();
        expect(findOneByOrFailSpy).toHaveBeenCalledWith({
            ...conditions,
            isDeleted: false,
        });
    });

    it('should add a product', async () => {
        jest.spyOn(repository, 'existsBy').mockResolvedValue(false);

        const saveSpy = jest
            .spyOn(repository, 'save')
            .mockResolvedValue(mockRes);

        const res = await repository.addProduct(mockRes);
        expect(saveSpy).toHaveBeenCalledWith(mockRes);
        expect(res).toEqual(mockRes);
    });

    it('should throw BadRequestException when adding an existing product', async () => {
        jest.spyOn(repository, 'existsBy').mockResolvedValue(true);

        const saveSpy = jest.spyOn(repository, 'save');

        try {
            await repository.addProduct(mockRes);
        } catch (e) {
            expect(e.response.statusCode).toBe(400);
            expect(e.response.message).toBe('Product exists');
            expect(saveSpy).not.toHaveBeenCalled();
        }
    });

    it('should update a product', async () => {
        jest.spyOn(repository, 'existsBy').mockResolvedValue(true);

        const mockResult = new UpdateResult();
        const updateSpy = jest
            .spyOn(repository, 'update')
            .mockResolvedValue(mockResult);

        const res = await repository.updateProduct('1000', {
            location: 'East Malaysia',
            price: 500,
        });
        expect(updateSpy).toHaveBeenCalledWith(
            {
                productCode: '1000',
                location: 'East Malaysia',
            },
            {
                price: 500,
            },
        );
        expect(res).toEqual(mockResult);
    });

    it('should throw BadRequestException when updating a product not exists', async () => {
        jest.spyOn(repository, 'existsBy').mockResolvedValue(false);

        const updateSpy = jest.spyOn(repository, 'update');

        try {
            await repository.updateProduct('1000', {
                location: 'West Malaysia',
                price: 500,
            });
        } catch (e) {
            expect(e.response.statusCode).toEqual(400);
            expect(e.response.message).toEqual('Product not exists');
            expect(updateSpy).not.toHaveBeenCalled();
        }
    });

    it('should delete a product', async () => {
        jest.spyOn(repository, 'existsBy').mockResolvedValue(true);

        const mockResult = new UpdateResult();
        const deleteSpy = jest
            .spyOn(repository, 'update')
            .mockResolvedValue(mockResult);

        const res = await repository.deleteProduct('1000');
        expect(deleteSpy).toHaveBeenCalled();
        expect(res).toEqual(mockResult);
    });

    it('should throw BadRequestException when deleting a product not exists', async () => {
        jest.spyOn(repository, 'existsBy').mockResolvedValue(false);

        const deleteSpy = jest.spyOn(repository, 'update');

        try {
            await repository.deleteProduct('2000');
        } catch (e) {
            expect(e.response.statusCode).toEqual(400);
            expect(e.response.message).toEqual('Product not exists');
            expect(deleteSpy).not.toHaveBeenCalled();
        }
    });
});
