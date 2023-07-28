import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const data = await prisma.job.delete({
        where: {
          id: Number(req.query.id),
        },
      });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  if (req.method === 'PUT') {
    const { name, status, modality, company, createdAt, description } =
      req.body;

    try {
      const data = await prisma.job.update({
        where: {
          id: Number(req.query.id),
        },
        data: {
          name,
          company,
          status,
          modality,
          createdAt,
          description,
        },
      });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  if (req.method === 'GET') {
    try {
      const jobs = await prisma.job.findUnique({
        where: {
          id: Number(req.query.id),
        },
      });

      return res.status(200).json(jobs);
    } catch (err) {
      return res.status(404).json({ message: err });
    }
  }
}
