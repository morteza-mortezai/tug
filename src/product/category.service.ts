import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  // findAll() {
  //   return `This action returns all product`;
  // }

  findOne(id: number) {
    return this.categoryRepo.findOneByOrFail({ id });
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
  async seed() {
    const count = await this.categoryRepo.count();
    if (count > 0) return;

    const categories: {
      name: string;
      subcategories: { name: string; category?: any }[];
    }[] = [
      {
        name: 'Category A',
        subcategories: [{ name: 'Subcategory A1' }, { name: 'Subcategory A2' }],
      },
      {
        name: 'Category B',
        subcategories: [{ name: 'Subcategory B1' }, { name: 'Subcategory B2' }],
      },
    ];

    for (const category of categories) {
      category.subcategories.forEach((subcategory) => {
        subcategory.category = category;
      });
    }

    await this.categoryRepo.save(categories);
  }
}
