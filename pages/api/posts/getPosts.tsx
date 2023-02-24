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

    // if (!session)
    //   return res.status(401).json({ message: "Sign in to get posts" });

    // const activeUser = await client.user.findUnique({
    //   where: {
    //     email: session?.user?.email,
    //   },
    // });

    // Fetch all posts
    try {
      const result = await client.post.findMany({
        include: {
          user: true,
          Comment: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
