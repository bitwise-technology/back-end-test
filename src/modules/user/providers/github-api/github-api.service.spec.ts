import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as faker from 'faker/locale/pt_BR';
import { of } from 'rxjs';

import {
  GithubResponseUserMetrics,
  GithubUser,
  GraphqlResponse,
  GithubUserMetrics
} from '../../model';
import { GithubApiService } from './github-api.service';

const dummyGithubUser = {
  avatarUrl: faker.internet.url(),
  bio: faker.lorem.text(),
  email: faker.internet.email(),
  login: faker.internet.userName(),
  name: faker.name.firstName()
} as GithubUser;

const dummyResponseMetrics = {
  followers: {
    totalCount: faker.random.number()
  },
  following: {
    totalCount: faker.random.number()
  },
  repositories: {
    totalCount: faker.random.number()
  },
  url: faker.internet.url()
} as GithubResponseUserMetrics;

describe('GithubApiService', () => {
  let service: GithubApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubApiService],
      imports: [HttpModule]
    }).compile();

    service = module.get<GithubApiService>(GithubApiService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get user metrics', done => {
    const spy = spyOn(httpService, 'post').and.returnValue(
      of({ data: { data: { user: dummyGithubUser } } } as GraphqlResponse)
    );
    service.getUserInfo(faker.internet.userName()).subscribe(user => {
      expect(user).toBeDefined();
      expect(user).toEqual(dummyGithubUser);
      done();
    });
    expect(spy).toHaveBeenCalled();
  });

  it('Get Metrics', done => {
    const expectdResponse = {
      totalFollowers: dummyResponseMetrics.followers.totalCount,
      profileUrl: dummyResponseMetrics.url,
      totalFollowing: dummyResponseMetrics.following.totalCount,
      totalPublicRepositories: dummyResponseMetrics.repositories.totalCount
    } as GithubUserMetrics;
    const spy = spyOn(httpService, 'post').and.returnValue(
      of({ data: { data: { user: dummyResponseMetrics } } } as GraphqlResponse)
    );

    service.getUserMetrics(faker.internet.userName()).subscribe(metrics => {
      expect(metrics).toBeDefined();
      expect(metrics).toEqual(expectdResponse);
      done();
    });

    expect(spy).toHaveBeenCalled();
  });
});
