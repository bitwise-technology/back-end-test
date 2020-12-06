import { Test, TestingModule } from '@nestjs/testing';

import { GithubApiService } from './github-api.service';

describe('GithubApiService', () => {
  let service: GithubApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubApiService]
    }).compile();

    service = module.get<GithubApiService>(GithubApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
