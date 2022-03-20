import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import moment from "moment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const status = {
      site: "HEALTHY",
      siteUpdatedAt: "Error",
      scraper: "Error",
    };

    await axios
      .get("https://lostarkstatusscraper.herokuapp.com/")
      .then((res: any) => {
        status.scraper = res.data.status;
      });

    await axios
      .get(
        "https://api.github.com/repos/taghead/lost-ark-status-site-public/branches/main"
      )
      .then((res: any) => {
        status.siteUpdatedAt = moment(res.data.commit.commit.author.date)
          .local()
          .startOf("seconds")
          .fromNow();
      });

    return res.status(200).json(status);
  } else {
    // Handle any other HTTP method
  }
  res.status(500).json({ message: "Something broke :S" });
}
