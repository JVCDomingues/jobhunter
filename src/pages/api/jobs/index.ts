import { NextApiRequest, NextApiResponse } from 'next';
import { parseISO } from 'date-fns';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const jobs = await prisma.job.findMany();
    return res.status(200).json(jobs);
  }

  if (req.method === 'POST') {
    const { name, company, createdAt, userId } = req.body;

    if (!name || !company || !createdAt || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newJob = await prisma.job.create({
      data: {
        name,
        company,
        createdAt: parseISO(createdAt),
        applierId: userId,
      },
    });

    return res.status(201).json({ newJob });
  }
}
