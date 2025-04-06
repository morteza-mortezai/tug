import { IsNotEmpty } from 'class-validator';
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
  productId: number;
}
