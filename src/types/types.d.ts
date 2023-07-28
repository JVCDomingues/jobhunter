export interface User {
  id: number;
  name: string;
  username: string;
  jobs: Job[];
}

export interface Job {
  id: number;
  name: string;
  description: string;
  company: string;
  createdAt: string;
  modality: string;
  status: string;
  applierId: number;
}
