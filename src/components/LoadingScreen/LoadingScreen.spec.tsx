import LoadingScreen from '.';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Loading Screen', () => {
  it('should render component correctly', () => {
    render(<LoadingScreen />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
