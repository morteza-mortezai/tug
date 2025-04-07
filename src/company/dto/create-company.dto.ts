import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'The name of the company',
    example: 'Company Name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The product ID associated with the company',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  productId: number;
}
