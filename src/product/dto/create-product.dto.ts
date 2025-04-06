import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  barcode: string;

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsInt()
  subcategoryId?: number;
}
