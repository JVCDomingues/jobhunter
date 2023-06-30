import { User } from '@/hooks/useUser';

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const filterUsersBySearchTerm = (users: User[], searchTerm: string) => {
  const filteredUsers = searchTerm
    ? users.filter(
        user =>
          user.username.includes(searchTerm) ||
          user.name.includes(capitalizeFirstLetter(searchTerm))
      )
    : users;

  return filteredUsers;
};

export default filterUsersBySearchTerm;
