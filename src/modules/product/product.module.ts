import { Module } from '@nestjs/common';
import { ProductDBModule } from '../../db/product/product.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CustomLogger } from '../../utilities/custom-logger';

@Module({
  controllers: [ProductController],
  imports: [ProductDBModule],
  providers: [ProductService, CustomLogger],
  exports: [ProductService],
})
export class ProductModule {}
