import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const users = await prisma.user.delete({
        where: {
          id: Number(req.query.id),
        },
      });
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json({ error: 'Could not delete user' });
    }
  }

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.query.id),
      },
      include: {
        jobs: {},
      },
    });

    if (!user?.id) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  }
}
