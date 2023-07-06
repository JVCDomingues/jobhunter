import JobTable from './JobTable';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Job } from '@/hooks/useUser';

const fakeJob: Job = {
  id: 123,
  name: 'Front End Developer',
  company: 'americanas s.a.',
  createdAt: new Date().toISOString(),
};

describe('Job Card component', () => {
  it('should render component correctly', () => {
    render(<JobTable job={fakeJob} />);

    expect(screen.getByText('Front End Developer')).toBeInTheDocument();
    expect(screen.getByText('americanas s.a.')).toBeInTheDocument();
    expect(screen.getByText('Applied today')).toBeInTheDocument();
  });
});
