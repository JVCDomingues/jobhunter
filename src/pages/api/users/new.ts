import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

interface RequestBody {
  name: string;
  username: string;
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const requestUser = req.body as RequestBody;

  const user = await prisma.user.findUnique({
    where: { username: requestUser.username },
  });

  if (user?.id) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const savedUser = await prisma.user.create({
      data: requestUser,
    });

    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
