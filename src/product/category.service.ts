import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll() {
    const cacheKey = 'categories:all';
    const cached = await this.cacheManager.get<Category[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const categories = await this.categoryRepo.find({
      relations: ['subcategories'],
    });
    await this.cacheManager.set(cacheKey, categories);
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['subcategories'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

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
