import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from './product.service';
import { CustomLogger } from '../../utilities/custom-logger';

@Controller('product')
export class ProductController {
  private readonly LoggerService: CustomLogger = new CustomLogger(
    ProductController.name,
  );

  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() productData: CreateProductDto,
  ): Promise<IProduct> {
    try {
      this.LoggerService.log('creating product in DB ...');

      const result = await this.productService.createProduct({
        ...productData,
        isActive: true,
      });

      this.LoggerService.log('created product in DB');

      return result;
    } catch (e) {
      const trace = e.stack || '';
      this.LoggerService.error(e, trace);
    }
  }

  @Get()
  async geAllProduct(): Promise<IProduct[] | null> {
    try {
      this.LoggerService.log('fetching products from DB ...');

      const result = await this.productService.getAllProducts();

      this.LoggerService.log('fetched products from DB');

      return result;
    } catch (e) {
      const trace = e.stack || '';
      this.LoggerService.error(e, trace);
    }
  }

  @Get(':id')
  async getProductById(@Param() { id }): Promise<IProduct | null> {
    try {
      this.LoggerService.log(`fetching product from DB with id: ${id} `);

      const result = await this.productService.getProductById(id);

      this.LoggerService.log(`fetched product from DB with id: ${id} `);

      return result;
    } catch (e) {
      const trace = e.stack || '';
      this.LoggerService.error(e, trace);
    }
  }

  @Put(':id')
  async updateProduct(
    @Param() { id },
    @Body() data: UpdateProductDto,
  ): Promise<void> {
    try {
      this.LoggerService.log(`updating product with id: ${id} `);

      await this.productService.updateProduct(id, data);

      this.LoggerService.log(`updated product with id: ${id} `);
    } catch (e) {
      const trace = e.stack || '';
      this.LoggerService.error(e, trace);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param() id: string): Promise<void> {
    try {
      this.LoggerService.log(`deleting product with id: ${id} `);

      await this.productService.deleteProduct(id);
      this.LoggerService.log(`deleted product with id: ${id} `);
    } catch (e) {
      const trace = e.stack || '';
      this.LoggerService.error(e, trace);
    }
  }
}
