// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return await prisma.server
      .findMany({
        orderBy: [
          {
            name: "asc",
          },
        ],
        include: {
          serverStatus: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      })
      .then((servers) => {
        if (!servers) return res.status(404).json({ message: `Not found` });
        return res.status(200).json(JSON.parse(JSON.stringify(servers)));
      })
      .catch((err) => {
        res.status(500).json({ message: "Something broke :S" });
      });
  } else {
    // Handle any other HTTP method
  }
  res.status(500).json({ message: "Something broke :S" });
}
