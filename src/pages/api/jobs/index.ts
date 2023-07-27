import { NextApiRequest, NextApiResponse } from 'next';
import { parseISO } from 'date-fns';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const jobs = await prisma.job.findMany();
      return res.status(200).json(jobs);
    } catch (err) {
      return res.status(404).json({ message: 'Jobs not found' });
    }
  }

  if (req.method === 'POST') {
    const { name, company, createdAt, userId, modality } = req.body;

    if (!name || !company || !createdAt || !userId || !modality) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newJob = await prisma.job.create({
        data: {
          name,
          company,
          createdAt: parseISO(createdAt),
          applierId: userId,
          modality,
        },
      });
      return res.status(201).json({ newJob });
    } catch (err) {
      return res.status(400).json({ message: 'Could not add new job' });
    }
  }
}
