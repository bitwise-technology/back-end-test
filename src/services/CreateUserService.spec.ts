import CreateUserService from './CreateUserService';

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    createUser = new CreateUserService();
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      username: 'bruno',
      name: 'Bruno',
      email: 'bruno.bezerra@gmail.com',
    });

    expect(user.username).toHaveProperty('id');
  });
});
