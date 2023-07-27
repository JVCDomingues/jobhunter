import Header from '.';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header component', () => {
  it('should render component correctly', () => {
    render(<Header />);

    expect(screen.getByText('JobHunter')).toBeInTheDocument();
  });

  it('should be able to open menu when the screen size is small', () => {
    render(
      <div className="w-96">
        <Header />
      </div>
    );

    const button = screen.getByTestId('toggle-menu');
    fireEvent.click(button);

    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });
});
