import JobTable from './JobTable';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Job } from '@/hooks/useUser';

const fakeJobs: Job[] = [
  {
    id: 123,
    name: 'Front End Developer',
    company: 'americanas s.a.',
    createdAt: new Date().toISOString(),
    modality: 'Remote',
    status: 'Pending',
  },
  {
    id: 250,
    name: 'FullStack Developer',
    company: 'Gupy',
    createdAt: new Date().toISOString(),
    modality: 'Hybrid',
    status: 'Approved',
  },
];

describe('Job Card component', () => {
  it('should render component correctly', () => {
    const revalidate = jest.fn();

    render(<JobTable jobs={fakeJobs} revalidate={revalidate} />);

    expect(screen.getByText('Front End Developer')).toBeInTheDocument();
    expect(screen.getByText('americanas s.a.')).toBeInTheDocument();
  });
});
