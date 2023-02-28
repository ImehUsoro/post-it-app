// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import client from "../../../prisma/client";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res.status(401).json({ message: "Sign in to view your posts" });

    // Get Auth User's posts
    try {
      const result = await prisma.user.findUnique({
        where: {
          email: session?.user?.email || undefined,
        },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: true,
            },
          },
        },
      });
      return res
        .status(201)
        .json({ ...result, message: "User's post successfully retrieved" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
