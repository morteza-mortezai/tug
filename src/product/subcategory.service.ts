import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepo: Repository<Subcategory>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll() {
    const cacheKey = 'subcategories:all';
    const cached = await this.cacheManager.get<Subcategory[]>(cacheKey);
    if (cached) {
      return cached;
    }
    const subcategories = await this.subcategoryRepo.find({
      relations: ['category'],
    });
    await this.cacheManager.set(cacheKey, subcategories);
    return subcategories;
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
}
