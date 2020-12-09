import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      synchronize: true,
      database: 'data/dev-db.sqlite',
      entities: ['dist/**/*.model{.ts,.js}']
    }),
    ConfigModule.forRoot(),
    UserModule
  ],
  controllers: [AppController]
})
export class AppModule {}
