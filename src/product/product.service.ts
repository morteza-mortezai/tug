import { Injectable, NotFoundException } from '@nestjs/common';
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
      product.subCategory = await this.subcategorySevice.findRelatedSubcategory(
        {
          subcategoryId: createProductDto.subcategoryId,
          categoryId: createProductDto.categoryId,
        },
      );
    }
    product.name = createProductDto.name;
    product.barcode = createProductDto.barcode;
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find({
      relations: ['category', 'subCategory'],
    });
  }

  async findOneBy(option: Record<string, any>) {
    const product = await this.productRepo.findOne({
      where: { ...option },
      relations: ['category', 'subCategory'],
    });
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOneBy({ id });

    return this.productRepo.save({ ...product, ...updateProductDto });
  }

  async remove(id: number) {
    const result = await this.productRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return result;
  }
}
