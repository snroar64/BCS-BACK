import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  rateInterest: number;

  @IsNumber()
  minimumAmount: number;

  @IsNumber()
  maximumAmount: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
