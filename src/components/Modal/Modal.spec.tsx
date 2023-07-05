import Modal from '.';

import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Modal Component', () => {
  it('should render component correctly', () => {
    const handleClose = jest.fn();

    render(
      <Modal isOpen handleClose={handleClose}>
        <h1>Modal component</h1>
      </Modal>
    );

    expect(screen.getByText('Modal component')).toBeInTheDocument();
  });

  it('should be able to close the modal by clicking on the close button', () => {
    const handleClose = jest.fn();

    render(
      <Modal isOpen handleClose={handleClose}>
        <h1>Modal component</h1>
      </Modal>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClose).toHaveBeenCalled();
  });
});
