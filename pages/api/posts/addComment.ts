import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res.status(401).json({ message: "Sign in to view your posts" });

    // Get User
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });

    // Get Auth User's posts
    try {
      const { title, postId } = req.body.data;

      if (!title)
        return res.status(400).json({ message: "Please enter a comment" });

      if (title.length > 300)
        return res.status(400).json({ message: "Title is too long" });

      const result = await prisma.comment.create({
        data: {
          message: title,
          postId,
          userId: user?.id || "",
        },
      });

      return res
        .status(201)
        .json({ ...result, message: "Comment successfully added" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
