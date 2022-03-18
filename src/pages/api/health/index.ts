import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const status = {
      site: "HEALTHY",
      scraper: "Error",
    };

    await axios
      .get("https://lostarkstatusscraper.herokuapp.com/")
      .then((res: any) => {
        status.scraper = res.data.status;
      });

    return res.status(200).json(status);
  } else {
    // Handle any other HTTP method
  }
  res.status(500).json({ message: "Something broke :S" });
}
