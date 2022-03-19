import useSWR from "swr";
import axios from "axios";
import { Spinners } from "../Loading";

interface props {
  className?: string;
}

const getRequest = (url: string) => {
  return axios.get(url).then((res: any) => {
    return res.data;
  });
};

export const HealthCheck = ({ className }: props) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/health`,
    getRequest
  );

  if (error) return <div>An error has occurred.</div>;

  return (
    <div className="grid grid-cols-1 divide-y divide-gray-400">
      <div className="flex justify-between">
        <div>Site:</div>
        <div>{data ? data?.site : <Spinners className={`h-4 w-4`} />}</div>
      </div>
      <div className="flex justify-between">
        <div>Scraper:</div>
        <div>{data ? data?.scraper : <Spinners className={`h-4 w-4`} />}</div>
      </div>
    </div>
  );
};
