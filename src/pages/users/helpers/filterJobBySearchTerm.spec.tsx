import { Job } from '@/hooks/useUser';
import { filterJobBySearchTerm } from './filterJobBySearchTerm';

const fakeJobs: Job[] = [
  {
    name: 'Front End Developer',
    company: 'americanas s.a.',
    createdAt: '2023-07-09T14:16:26.736Z',
    modality: 'Remote',
    status: 'Pending',
    id: 12345,
  },
  {
    name: 'QA Assistant',
    company: 'iFood',
    createdAt: '2023-07-09T14:16:26.736Z',
    modality: 'Hybrid',
    status: 'Interviewing',
    id: 223,
  },
  {
    name: 'AI Data Engineer',
    company: 'Nubank',
    createdAt: '2023-07-09T14:16:26.736Z',
    modality: 'On-site',
    status: 'Rejected',
    id: 122,
  },
  {
    name: 'Senior Copywriter',
    company: 'Zé Delivery',
    createdAt: '2023-07-09T14:16:26.736Z',
    modality: 'Remote',
    status: 'Pending',
    id: 198,
  },
];

describe('FilterJobBySearchTerm', () => {
  it('should be able to filter job by name', () => {
    const filteredJobs = filterJobBySearchTerm(fakeJobs, 'developer');

    const expectedResult = [
      {
        name: 'Front End Developer',
        company: 'americanas s.a.',
        createdAt: '2023-07-09T14:16:26.736Z',
        modality: 'Remote',
        status: 'Pending',
        id: 12345,
      },
    ];

    expect(filteredJobs).toEqual(expectedResult);
  });

  it('should be able to filter job by company name', () => {
    const filteredJobs = filterJobBySearchTerm(fakeJobs, 'ifood');

    const expectedResult = [
      {
        name: 'QA Assistant',
        company: 'iFood',
        createdAt: '2023-07-09T14:16:26.736Z',
        modality: 'Hybrid',
        status: 'Interviewing',
        id: 223,
      },
    ];

    expect(filteredJobs).toEqual(expectedResult);
  });

  it('should be able to filter job by modality', () => {
    const filteredJobs = filterJobBySearchTerm(fakeJobs, 'pending');

    const expectedResult = [
      {
        name: 'Front End Developer',
        company: 'americanas s.a.',
        createdAt: '2023-07-09T14:16:26.736Z',
        modality: 'Remote',
        status: 'Pending',
        id: 12345,
      },
      {
        name: 'Senior Copywriter',
        company: 'Zé Delivery',
        createdAt: '2023-07-09T14:16:26.736Z',
        modality: 'Remote',
        status: 'Pending',
        id: 198,
      },
    ];

    expect(filteredJobs).toEqual(expectedResult);
  });
});
