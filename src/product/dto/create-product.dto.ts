import {
  IsString,
  IsInt,
  IsOptional,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }: { value: unknown }) => String(value))
  @Matches(/^\d+$/, { message: 'Barcode must be a numeric string' })
  barcode: string;

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsInt()
  subcategoryId?: number;
}
