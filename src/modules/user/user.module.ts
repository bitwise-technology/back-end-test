import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers';
import { User } from './model';
import { UserService } from './providers';
import { GithubApiService } from './providers/github-api/github-api.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  providers: [UserService, GithubApiService],
  controllers: [UserController]
})
export class UserModule {}
