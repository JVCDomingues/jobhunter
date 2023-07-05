import Spinner from '.';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Spinner', () => {
  it('should render component correctly', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
