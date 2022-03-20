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
  if (!data) return <SkeletonBox className={`h-min max-h-full`} />;

  return (
    <div className={`overflow-y-scroll ${className}`}>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Server</th>
            <th>Region</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((server: any) => {
            return (
              <tr key={server.id} className="w-fit">
                <td>
                  <Link href={`?id=${server.id} `}>
                    <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
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
