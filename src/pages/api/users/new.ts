import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt')

interface RequestBody {
  name: string;
  username: string;
  password: string;
}

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { password: userPassword, ...rest } = req.body as RequestBody;

  try {
    const password = await bcrypt.hash(userPassword, 5);

    const newUser = {...rest, password}
  
    const savedUser = await prisma.user.create({
      data: newUser
    });

    return res.status(201).json(savedUser)
  } catch(err) {
    return res.status(500).json({ message: err })
  }
}