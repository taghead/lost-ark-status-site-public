import { useRouter } from "next/router";
import { SkeletonBox } from "../Loading";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";

interface props {
  selectedServerId: any;
  setSelectedServerId: any;
  className?: string;
}

const fetcher = (url: string) => {
  return axios
    .get(url)
    .then((res: any) => {
      const data = res.data;
      return data;
    })
    .catch((err) => {
      return null;
    });
};

export const ServerListDivider = ({
  selectedServerId,
  setSelectedServerId,
  className,
}: props) => {
  const router = useRouter();

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/server`,
    fetcher
  );

  if (error) return <div>An error has occurred. Unable to load servers.</div>;
  if (!data)
    return (
      <div className={`overflow-y-scroll ${className}`}>
        <SkeletonBox className={`h-8  mb-2`} />
        <SkeletonBox className={`h-8  mb-2`} />
        <SkeletonBox className={`h-8  mb-2`} />
        <SkeletonBox className={`h-8  mb-2`} />
        <SkeletonBox className={`h-8  mb-2`} />
        <SkeletonBox className={`h-8  mb-2`} />
        <SkeletonBox className={`h-8  mb-2`} />
      </div>
    );

  return (
    <div className={`overflow-y-scroll ${className}`}>
      <table className="w-full text-left  ">
        <thead>
          <tr className=" bg-slate-200  sticky top-0">
            <th>Server</th>
            <th>Region</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-solid ">
          {data.map((server: any) => {
            return (
              <tr
                key={server.id}
                className="w-fit hover:bg-blue-100 odd:bg-white even:bg-slate-100"
              >
                <td>
                  <Link href={`?id=${server.id} `}>
                    <a className="underline text-black font-semibold  visited:text-gray-400">
                      {server.name}
                    </a>
                  </Link>
                </td>
                <td>{server.region}</td>
                <td>{server.serverStatus[0].status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
