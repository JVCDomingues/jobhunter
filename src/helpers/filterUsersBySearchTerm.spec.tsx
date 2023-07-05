import { User } from '@/hooks/useUser';
import filterUsersBySearchTerm from './filterUsersBySearchTerm';

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe123',
    jobs: [],
  },
  {
    id: 2,
    name: 'Mary Jane',
    username: 'maryjane24',
    jobs: [],
  },
  {
    id: 3,
    name: 'George Harrison',
    username: 'georgehar',
    jobs: [],
  },
];

describe('Helpers - Filter user by search term', () => {
  it('should filter user by name', () => {
    const filteredUser = filterUsersBySearchTerm(users, 'John');

    const expectedUsers = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe123',
        jobs: [],
      },
    ];

    expect(filteredUser).toEqual(expectedUsers);
  });

  it('should filter user by username', () => {
    const filteredUser = filterUsersBySearchTerm(users, 'mary');

    const expectedUsers = [
      {
        id: 2,
        name: 'Mary Jane',
        username: 'maryjane24',
        jobs: [],
      },
    ];

    expect(filteredUser).toEqual(expectedUsers);
  });

  it('should return all users if no search term is provided', () => {
    const filteredUsers = filterUsersBySearchTerm(users, '');
    expect(filteredUsers).toEqual(users);
  });
});
