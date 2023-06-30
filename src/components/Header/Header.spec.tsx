import Header from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header component', () => {
  it('should render component correctly', () => {
    render(<Header />);

    expect(screen.getByText('jobHunter')).toBeInTheDocument();
  });
});
