import { Module } from '@nestjs/common';
import { ProductDBModule } from '../../db/product/product.module';

@Module({
  imports: [ProductDBModule],
})
export class ProductModule {}
