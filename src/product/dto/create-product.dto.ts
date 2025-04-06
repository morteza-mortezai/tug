import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsInt()
  subcategoryId?: number;
}
