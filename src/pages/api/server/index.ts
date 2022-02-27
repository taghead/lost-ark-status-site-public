// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const getServers = await prisma.server
      .findMany({
        orderBy: [
          {
            name: "asc",
          },
        ],
        include: {
          serverStatus: {
            orderBy: {
              createdAt: "asc",
            },
            take: 1,
          },
        },
      })
      .then((servers) => {
        return servers;
      });

    return res.status(200).json(getServers);
  } else {
    // Handle any other HTTP method
  }
  res.status(200).json({ name: "John Doe" });
}
