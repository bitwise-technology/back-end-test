import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as faker from 'faker';
import { MockType } from 'test/models/mocktype';
import { Repository } from 'typeorm';

import { User, USER_GENDER } from '../../model';
import { UserDTO } from '../../validators';
import { UserService } from './user.service';

export const dummyUserDTO = {
  bio: faker.lorem.text(),
  email: faker.internet.email(),
  gender: USER_GENDER.NOT_SPECIFIED,
  id: faker.random.number(),
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  profileImageUrl: faker.internet.url(),
  username: faker.internet.userName()
} as UserDTO;

export const listDummyUsers = [
  {
    bio: faker.lorem.text(),
    email: faker.internet.email(),
    gender: USER_GENDER.NOT_SPECIFIED,
    id: faker.random.number(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profileImageUrl: faker.internet.url(),
    username: faker.internet.userName()
  },
  {
    bio: faker.lorem.text(),
    email: faker.internet.email(),
    gender: USER_GENDER.NOT_SPECIFIED,
    id: faker.random.number(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profileImageUrl: faker.internet.url(),
    username: faker.internet.userName()
  },
  {
    bio: faker.lorem.text(),
    email: faker.internet.email(),
    gender: USER_GENDER.NOT_SPECIFIED,
    id: faker.random.number(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profileImageUrl: faker.internet.url(),
    username: faker.internet.userName()
  }
] as User[];

export const repositoryUserMockFactory: () => MockType<
  Partial<Repository<User>>
> = jest.fn(() => ({
  findOne: jest.fn(id =>
    Promise.resolve(listDummyUsers.find(user => user.id === id) || null)
  ),
  create: jest.fn(entity => entity),
  save: jest.fn(entity => Promise.resolve(entity)),
  find: jest.fn(() => Promise.resolve([...listDummyUsers])),
  update: jest.fn((_, user) => Promise.resolve(user))
}));

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,

        {
          provide: getRepositoryToken(User),
          useFactory: repositoryUserMockFactory
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Insert novo usuário', done => {
    service.insert(dummyUserDTO).subscribe(user => {
      expect(user).toBeDefined();
      expect(user).toEqual(dummyUserDTO);
      done();
    });
  });

  it('Find all users', done => {
    service.findAll().subscribe(users => {
      expect(users).toBeDefined();
      done();
    });
  });

  it('Find one user', done => {
    service.findOne(listDummyUsers[0].id).subscribe(user => {
      expect(user).toBeDefined();
      expect(user).toEqual(listDummyUsers[0]);
      done();
    });
  });

  it('Update user', done => {
    const updatedDummy = { ...listDummyUsers[0] } as UserDTO;
    service.update(updatedDummy).subscribe(user => {
      expect(user).toBeDefined();
      expect(user).toEqual(updatedDummy);
      done();
    });
  });
});
