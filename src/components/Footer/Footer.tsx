import axios from "axios";
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
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/health`,
    getRequest
  );

  return (
    <div
      className={`flex justify-between text-center p-6 bg-gray-200 ${className}`}
    >
      <div>Updated: {data ? data.siteUpdatedAt : "..."}</div>
      <div className="underline text-black font-semibold  visited:text-gray-400">
        <Link href="https://github.com/taghead/lostarkstatus.xyz">Github</Link>
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
