import DeleteUserDialog from '.';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const handleClose = jest.fn();
const revalidate = jest.fn();

describe('Page Component - DeleteUserDialog', () => {
  it('should render component correctly', () => {
    render(
      <DeleteUserDialog
        handleModalClose={handleClose}
        revalidate={revalidate}
        userId={2}
      />
    );

    expect(screen.getByText('Delete user')).toBeInTheDocument();
  });

  it('should be able to close the dialog by clicking the cancel button', async () => {
    render(
      <DeleteUserDialog
        handleModalClose={handleClose}
        revalidate={revalidate}
        userId={2}
      />
    );

    const button = screen.getByTestId('cancel-button');
    fireEvent.click(button);

    expect(handleClose).toHaveBeenCalled();
  });

  it('should call deleteUser and show success toast when clicking the delete button with a successful response', async () => {
    const openToastMock = jest.fn();
    jest.mock('@/components/Toast/ToastContext', () => ({
      useToast: jest.fn(() => ({ openToast: openToastMock })),
    }));

    render(
      <DeleteUserDialog
        handleModalClose={handleClose}
        revalidate={revalidate}
        userId={1}
      />
    );

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(revalidate).toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalled();
      expect(openToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' })
      );
    });
  });
});
