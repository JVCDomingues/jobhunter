import SuccessToast from './SuccessToast';
import ErrorToast from './ErrorToast';

import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Toast Component', () => {
  it('should render error toast correctly', () => {
    render(<ErrorToast message="Error message" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should render success toast correctly', () => {
    render(<SuccessToast message="Success message" />);

    expect(screen.getByText('Success message')).toBeInTheDocument();
  });
});
