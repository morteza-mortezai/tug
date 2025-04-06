import {
  IsString,
  IsInt,
  IsOptional,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Sample Product',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The barcode of the product',
    example: '1234567890123',
  })
  @Transform(({ value }: { value: unknown }) => String(value))
  @Matches(/^\d+$/, { message: 'Barcode must be a numeric string' })
  barcode: string;

  @ApiProperty({ description: 'The category ID of the product', example: 1 })
  @IsInt()
  categoryId: number;

  @ApiProperty({ description: 'The subcategory ID of the product', example: 1 })
  @IsOptional()
  @IsInt()
  subcategoryId?: number;
}
