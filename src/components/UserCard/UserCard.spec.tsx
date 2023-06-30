import { User } from '@/hooks/useUser';
import UserCard from '.';
import { fireEvent, screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

const fakeUser: User = {
  id: 1,
  name: 'João Victor',
  username: 'jvcdomingues',
  jobs: [
    {
      company: 'americanas sa',
      id: 3,
      name: 'Desenvolvedor Front End',
      createdAt: '2020-09-16',
    },
  ],
};

describe('UserCard', () => {
  it('should render component correctly', () => {
    const handleClick = jest.fn();
    render(<UserCard user={fakeUser} handleDeleteButton={handleClick} />);

    expect(screen.getByText('jvcdomingues')).toBeInTheDocument();
  });

  it('should be able to delete an user correctly', () => {
    const handleClick = jest.fn();
    render(<UserCard user={fakeUser} handleDeleteButton={handleClick} />);

    const button = screen.getByTestId('delete-button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
