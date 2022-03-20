import axios from "axios";
import moment from "moment";
import Link from "next/link";
import useSWR from "swr";

interface props {
  className?: string;
}

const getRequest = (url: string) => {
  return axios.get(url).then((res: any) => {
    return res.data;
  });
};

export const Footer = ({ className = "" }: props) => {
  const { data, error } = useSWR(
    "https://api.github.com/repos/taghead/lost-ark-status-site-public/branches/main",
    getRequest
  );

  return (
    <div
      className={`flex justify-between text-center p-6 bg-gray-200 ${className}`}
    >
      <div>
        Updated:{" "}
        {moment(data?.commit.commit.author.date)
          .local()
          .startOf("seconds")
          .fromNow()}
      </div>
      <div className="underline text-black font-semibold  visited:text-gray-400">
        <Link href="https://github.com/taghead/lost-ark-status-site-public">
          Github
        </Link>
      </div>
      <div className="flex justify-between">
        <span>Created by: </span>
        <div className="underline text-black font-semibold  visited:text-gray-400">
          <Link href="https://github.com/taghead">Taghead</Link>
        </div>
      </div>
    </div>
  );
};
