// config/redis-async.config.ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

export const redisAsyncConfig: CacheModuleAsyncOptions = {
  isGlobal: true, // optional: makes cache available app-wide
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get<string>('REDIS_HOST'),
    port: configService.get<number>('REDIS_PORT'),
    ttl: configService.get<number>('REDIS_TTL') || 60,
  }),
};
