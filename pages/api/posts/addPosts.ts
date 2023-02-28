// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import client from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res.status(401).json({ message: "Sign in to make a post" });

    const title: string = req.body.title;

    const user = await client.user.findUnique({
      where: {
        email: session?.user?.email || undefined,
      },
    });

    if (!title) return res.status(400).json({ message: "Title is required" });

    if (title.length > 300)
      return res.status(400).json({ message: "Title is too long" });

    // Create a post
    try {
      const result = await client.post.create({
        data: {
          title,
          userId: user?.id,
        },
      });
      return res
        .status(201)
        .json({ ...result, message: "Post successfully created" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
