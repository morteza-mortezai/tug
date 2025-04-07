import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { CategoryService } from './product/category.service';
import { LoggerService } from './common/logger/logger.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisAsyncConfig } from './config/redis.config';

@Module({
  imports: [
    CompanyModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      // envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CacheModule.registerAsync(redisAsyncConfig),
  ],
  controllers: [AppController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly mediaTypeService: CategoryService) {}
  async onModuleInit() {
    await this.mediaTypeService.seed();
  }
}
