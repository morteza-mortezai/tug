import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    console.log(
      'db**',
      configService.get<'mysql' | 'sqlite'>('DB_TYPE', 'mysql'),
    );
    const dbType = configService.get<string>('DB_TYPE', 'mysql');

    if (dbType === 'sqlite') {
      return {
        type: 'sqlite',
        database: configService.get<string>('DB_NAME', ':memory:'), // use in-memory db
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // auto-sync schema in tests
      };
    }

    return {
      type: configService.get<'mysql' | 'sqlite'>('DB_TYPE', 'mysql'),
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: configService.get<boolean>('DB_SYNC', false),
    };
  },
};
