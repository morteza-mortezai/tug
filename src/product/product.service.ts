import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { SubcategoryService } from './subcategory.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private categorySevice: CategoryService,
    private subcategorySevice: SubcategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create();
    product.category = await this.categorySevice.findOne(
      createProductDto.categoryId,
    );
    if (createProductDto.subcategoryId) {
      product.subCategory = await this.subcategorySevice.findOne(
        createProductDto.subcategoryId,
      );
    }
    product.name = createProductDto.name;
    return this.productRepo.save(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
