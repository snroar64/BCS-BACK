import { Injectable } from '@nestjs/common';
import { ProductDBService } from '../../db/product/product.service';
import { IProduct } from '../../interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(private readonly productDBService: ProductDBService) {}

  async createProduct(productData: IProduct): Promise<IProduct> {
    return this.productDBService.createProduct(productData);
  }

  async getAllProducts(): Promise<IProduct[]> {
    return this.productDBService.findAll();
  }

  async getProductById(id: string): Promise<IProduct | null> {
    return this.productDBService.findOne(id);
  }

  async updateProduct(
    id: string,
    productData: Partial<IProduct>,
  ): Promise<void> {
    this.productDBService.updateProduct(id, productData);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productDBService.deleteProduct(id);
  }
}
