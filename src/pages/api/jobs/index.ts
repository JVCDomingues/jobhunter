import { NextApiRequest, NextApiResponse } from 'next';

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
    const newJob = await prisma.job.create({
      data: {
        name: 'Software Engineer - FrontEnd',
        applier: {
          create: {
            username: 'jvcdomingues',
            name: 'João Victor Cardoso Domingues',
            password: 'admin',
          },
        },
        company: 'Mercado Livre',
        createdAt: new Date(),
      },
    });

    return res.status(201).json(newJob);
  }
}
