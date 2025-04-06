import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepo: Repository<Company>,
    private productservice: ProductService,
  ) {}

  async create(createDto: CreateCompanyDto) {
    const { name, productId } = createDto;

    const company = new Company();
    company.name = name;
    company.product = await this.productservice.findOneBy({ id: productId });
    return this.companyRepo.save(company);
  }

  findAll() {
    return this.companyRepo.find();
  }

  findOne(id: number) {
    return this.companyRepo.findOneByOrFail({ id });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepo.findOneByOrFail({ id });
    return this.companyRepo.save({ ...company, ...updateCompanyDto });
  }

  async remove(id: number) {
    return this.companyRepo.delete({ id });
  }
}
