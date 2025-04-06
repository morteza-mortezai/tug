import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepo: Repository<Subcategory>,
  ) {}

  // findAll() {
  //   return `This action returns all product`;
  // }

  findOne(id: number) {
    return this.subcategoryRepo.findOneByOrFail({ id });
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
