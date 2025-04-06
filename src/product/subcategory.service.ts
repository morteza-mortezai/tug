import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepo: Repository<Subcategory>,
  ) {}

  findAll() {
    return this.subcategoryRepo.find();
  }

  async findRelatedSubcategory({
    subcategoryId,
    categoryId,
  }: {
    subcategoryId: number;
    categoryId: number;
  }) {
    const subcategory = await this.subcategoryRepo.findOneBy({
      id: subcategoryId,
      category: { id: categoryId },
    });

    if (!subcategory) {
      throw new NotFoundException(
        `Subcategory with ID ${subcategoryId} and Category of ${categoryId} not found`,
      );
    }

    return subcategory;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
