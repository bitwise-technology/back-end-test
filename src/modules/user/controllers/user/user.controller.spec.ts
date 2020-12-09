import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as faker from 'faker/locale/pt_BR';
import { of } from 'rxjs';

import { GithubUser, GithubUserMetrics, User } from '../../model';
import { UserService } from '../../providers';
import { GithubApiService } from '../../providers/github-api/github-api.service';
import {
  listDummyUsers,
  repositoryUserMockFactory
} from '../../providers/user-service/user.service.spec';
import { UserDTO, UserUpdateDTO } from '../../validators';
import { DefaultResponse, UserController } from './user.controller';

const dummyGithubUser = {
  avatarUrl: faker.internet.url(),
  bio: faker.lorem.text(),
  email: faker.internet.email(),
  login: faker.internet.userName(),
  name: faker.name.firstName()
} as GithubUser;

const dummyGithubUserMetrics = {
  totalFollowers: faker.random.number(),
  profileUrl: faker.internet.url(),
  totalFollowing: faker.random.number(),
  totalPublicRepositories: faker.random.number()
} as GithubUserMetrics;

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: GithubApiService,
          useValue: {
            getUserInfo: () => of(dummyGithubUser),
            getUserMetrics: () => of(dummyGithubUserMetrics)
          }
        },
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryUserMockFactory
        }
      ],
      imports: [HttpModule]
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('List all users', done => {
    controller.listAllUsers().subscribe(response => {
      expect(response).toBeDefined();
      expect(response.users).toEqual(listDummyUsers);
      done();
    });
  });

  it('insert new user', done => {
    const dummyUserDto = {
      bio: faker.lorem.text(),
      email: faker.internet.email(),
      id: faker.random.number(),
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profileImageUrl: faker.internet.url(),
      username: faker.internet.userName()
    } as UserDTO;

    controller.inserNewUser(dummyUserDto).subscribe(response => {
      expect(response).toBeDefined();
      expect(response.user).toEqual(dummyUserDto);

      done();
    });
  });

  it('inset with github', done => {
    const dummyResponse = {
      status: () => dummyResponse,
      json: () => dummyResponse,
      send: () => 'sent'
    };
    controller
      .inserWithUsernameGithub(
        { username: faker.internet.userName() },
        dummyResponse as any
      )
      .subscribe(response => {
        const expectedUser = {
          name: dummyGithubUser.name,
          githubLogin: dummyGithubUser.login,
          profileImageUrl: dummyGithubUser.avatarUrl,
          email: dummyGithubUser.email,
          bio: dummyGithubUser.bio,
          username: dummyGithubUser.login
        } as User;

        expect(response).toBeDefined();
        expect((response as DefaultResponse).user).toEqual(expectedUser);
        done();
      });
  });

  it('update user', done => {
    const dummyUpdateUserDTO = {
      ...listDummyUsers[0]
    } as UserUpdateDTO;
    controller
      .updateUser(dummyUpdateUserDTO.id, dummyUpdateUserDTO)
      .subscribe(response => {
        expect(response).toBeDefined();
        expect(response.user).toEqual(dummyUpdateUserDTO);
        done();
      });
  });

  it('get user by email', done => {
    const spy = spyOn(userService, 'findByEmail').and.returnValue(
      of({
        ...listDummyUsers[0]
      })
    );
    controller.getUserByEmail(listDummyUsers[0].email).subscribe(response => {
      expect(response).toBeDefined();
      expect(response.user).toEqual(listDummyUsers[0]);
      done();
    });

    expect(spy).toHaveBeenCalled();
  });

  it('get user by username', done => {
    const spy = spyOn(userService, 'findByUsername').and.returnValue(
      of({
        ...listDummyUsers[0]
      })
    );
    controller
      .getUserByUsername(listDummyUsers[0].username)
      .subscribe(response => {
        expect(response).toBeDefined();
        expect(response.user).toEqual(listDummyUsers[0]);
        done();
      });

    expect(spy).toHaveBeenCalled();
  });

  it('get user profile', done => {
    controller.getUserProfile(listDummyUsers[1].id).subscribe(response => {
      expect(response).toBeDefined();
      expect(response.user).toEqual({
        ...listDummyUsers[1],
        githubMetrics: dummyGithubUserMetrics
      } as User);

      done();
    });
  });

  it('get user by username', done => {
    const spy = spyOn(userService, 'findUsersWithSimilarName').and.returnValue(
      of([...listDummyUsers])
    );

    controller.getUsersByUsername('fakename').subscribe(response => {
      expect(response).toBeDefined();
      expect(response.users).toEqual(listDummyUsers);
      done();
    });

    expect(spy).toHaveBeenCalled();
  });
});
