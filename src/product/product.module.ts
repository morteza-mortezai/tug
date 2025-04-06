import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryService } from './category.service';
import { SubcategoryService } from './subcategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService, CategoryService, SubcategoryService],
  imports: [TypeOrmModule.forFeature([Product, Category, Subcategory])],
})
export class ProductModule {}
