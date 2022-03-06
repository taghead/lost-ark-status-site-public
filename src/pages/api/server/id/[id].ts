// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: any = req.query.id;
  const sort: any = req.query.sort;

  if (req.method === "GET") {
    return await prisma.server
      .findUnique({
        where: { id: id },
        include: {
          serverStatus: {
            orderBy: {
              createdAt: "desc",
            },
            take: 14,
          },
        },
      })
      .then((servers) => {
        if (!servers)
          return res.status(404).json({ message: `${id} not found` });
        return res.status(200).json(servers);
      })
      .catch((err) => {
        res.status(500).json({ message: "Something broke :S" });
      });
  } else {
    // Handle any other HTTP method
  }
  res.status(500).json({ message: "Something broke :S" });
}
