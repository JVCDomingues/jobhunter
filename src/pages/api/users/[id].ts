import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const users = await prisma.user.delete({
      where: {
        id: Number(req.query.id),
      },
    });

    return res.status(200).json(users);
  }

  if (req.method === 'GET') {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(req.query.id),
      },
    });

    if (!user?.id) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  }
}
