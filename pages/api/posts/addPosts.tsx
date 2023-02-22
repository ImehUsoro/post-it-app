// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   res.status(200).json({ name: "John Doe" });
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Sign in to make a post" });
    }

    // console.log(req.body);
    const title: string = req.body.title;

    res.status(201).json({ message: `Post created - ${title}` });
  }
}
