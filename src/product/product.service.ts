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
    // find and assign category
    product.category = await this.categorySevice.findOne(
      createProductDto.categoryId,
    );
    // find subcategory
    if (createProductDto.subcategoryId) {
      product.subCategory = await this.subcategorySevice.findOne({
        subcategoryId: createProductDto.subcategoryId,
        categoryId: createProductDto.categoryId,
      });
    }
    product.name = createProductDto.name;
    product.barcode = createProductDto.barcode;
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(option: Record<string, any>) {
    return this.productRepo.findOneByOrFail(option);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOneByOrFail({ id });

    return this.productRepo.save({ ...product, ...updateProductDto });
  }

  remove(id: number) {
    return this.productRepo.delete({ id });
  }
}
