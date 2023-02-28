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
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res.status(401).json({ message: "Sign in to view your posts" });

    // Get Auth User's posts
    try {
      const postId = req.body.id;
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return res
        .status(200)
        .json({ ...result, message: "Post successfully deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
