import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { IProduct } from '../../interfaces/product.interface';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductDBService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(data: IProduct): Promise<IProduct> {
    const product = await this.productRepository.save(data);
    return this.mapToInterface(product);
  }

  async findAll(): Promise<IProduct[]> {
    const products = await this.productRepository.find();
    return products.map((product) => this.mapToInterface(product));
  }

  async findOne(id: string): Promise<IProduct> {
    const product = await this.productRepository.findOne({
      where: {
        _id: new ObjectId(id),
      },
    });
    return product ? this.mapToInterface(product) : null;
  }

  async updateProduct(id: string, data: Partial<IProduct>): Promise<void> {
    await this.productRepository.update({ _id: new ObjectId(id) }, data);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private mapToInterface(product: Product): IProduct {
    return {
      id: (product.id as ObjectId).toHexString(),
      name: product.name,
      rateInterest: product.rateInterest,
      minimumAmount: product.minimumAmount,
      maximumAmount: product.maximumAmount,
      isActive: product.isActive,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
