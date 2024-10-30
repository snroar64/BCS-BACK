import { Repository } from 'typeorm';
import { ProductDBService } from '../../../src/db/product/product.service';
import { Product } from '../../../src/db/product/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { productMock } from '../mocks/product';
import { Mocked } from 'jest-mock';

describe('product db service', () => {
  let mockRepository: Mocked<Repository<Product>>;
  let service: ProductDBService;

  const mock = { ...productMock };
  mock.id = {
    toHexString: jest.fn().mockReturnValue('67225bf34afc74f78148a592'),
  } as any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductDBService,
        {
          provide: getRepositoryToken(Product),
          useFactory: () => ({
            findOne: jest.fn(() => Promise.resolve(mock)),
            find: jest.fn(() => Promise.resolve([mock])),
            save: jest.fn(() => Promise.resolve(mock)),
            remove: jest.fn(),
            update: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<ProductDBService>(ProductDBService);
    mockRepository = module.get(getRepositoryToken(Product));
  });

  it('should return a object type Product', async () => {
    mockRepository.findOne.mockResolvedValueOnce(mock);

    const result = await service.findOne('67225bf34afc74f78148a592');
    expect(result).toEqual(productMock);
    expect(mockRepository.findOne).toHaveBeenCalled();
  });

  it('should return null when product is null', async () => {
    mockRepository.findOne.mockResolvedValueOnce(null);

    const result = await service.findOne('67225bf34afc74f78148a592');
    expect(result).toBeNull();
    expect(mockRepository.findOne).toHaveBeenCalled();
  });

  it('should return a array type Product', async () => {
    mockRepository.find.mockResolvedValueOnce([mock]);

    const result = await service.findAll();
    expect(result).toEqual([productMock]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should create a product', async () => {
    const result = await service.createProduct(mock);
    expect(result).toEqual(productMock);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should update a product', async () => {
    await service.updateProduct('67225bf34afc74f78148a592', mock);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should delete a product', async () => {
    await service.deleteProduct('67225bf34afc74f78148a592');
    expect(mockRepository.remove).toHaveBeenCalled();
  });
});
