import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [ProductModule, TypeOrmModule.forFeature([Company])],
})
export class CompanyModule {}
