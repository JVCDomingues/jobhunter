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
}
