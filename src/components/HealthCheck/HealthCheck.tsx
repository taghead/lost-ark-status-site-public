import useSWR from "swr";
import axios from "axios";
import { SkeletonBox } from "../Loading";

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
  if (!data)
    return (
      <SkeletonBox
        className={`h-min max-h-full w-full flex-col ${className}`}
      />
    );

  return (
    <div className="grid grid-cols-1 divide-y divide-gray-400">
      <div className="flex justify-between">
        <div>Site:</div>
        <div>{data.site}</div>
      </div>
      <div className="flex justify-between">
        <div>Scraper:</div>
        <div>{data.scraper}</div>
      </div>
    </div>
  );
};
