export interface SnackbarProps {
  timeout?: number;
  message: string;
  isOpen: boolean;
  type: 'error' | 'warning' | 'success';
}
