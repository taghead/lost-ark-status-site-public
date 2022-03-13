import { updateUrl } from "../../../lib/updateUrl";
import { useRouter } from "next/router";
import { SkeletonBox } from "../../components/Loading";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from "axios";

interface props {
  selectedServerId: any;
  setSelectedServerId: any;
  className: string;
}

const defaultList = [
  {
    id: "0",
    uniqueName: "",
    name: "Failed to load...",
    region: " ",
    createdAt: " ",
    updatedAt: " ",
    serverStatus: [
      {
        id: " ",
        createdAt: " ",
        updatedAt: " ",
        status: "Full",
        serverId: " ",
      },
    ],
  },
];

const fetcher = (url: string) => {
  return axios
    .get(url)
    .then((res: any) => {
      const data = res.data;
      return data;
    })
    .catch((err) => {
      return defaultList;
    });
};

export const ServerList = ({
  selectedServerId,
  setSelectedServerId,
  className,
}: props) => {
  const router = useRouter();
  const search: any = router.query.search || undefined;

  const [searchServerList, setSearchServerList] = useState(search || "");

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/server`,
    fetcher
  );

  if (error)
    return <div>An error has occurred. Unable to load server status.</div>;
  if (!data) return <SkeletonBox className={className} />;

  const serverList = data;

  return (
    <div className={`bg-white shadow-2xl p-2 overflow-y-scroll ${className}`}>
      <input
        className="rounded border-2 p-2 m-2"
        type="text"
        placeholder="Search.."
        value={searchServerList}
        onChange={(el) => {
          setSearchServerList(el.target.value);
        }}
      />
      <div>
        {serverList
          .filter(
            (server: any) =>
              server.name
                .toLowerCase()
                .includes(searchServerList.toLowerCase()) ||
              server.region
                .toLowerCase()
                .includes(searchServerList.toLowerCase())
          )
          .map((server: any) => (
            <div
              className={`flex  justify-between rounded bg-white ${
                selectedServerId === server.id ? "bg-blue-100" : ""
              } hover:translate-x-2 shadow-2xl p-2 m-2 cursor-pointer`}
              key={server.id}
              onClick={() => {
                setSelectedServerId(server.id);
                updateUrl(
                  {
                    id: server.id,
                  },
                  router
                );
              }}
            >
              <div>
                <div className="tracking-widest">{server.name}</div>
                <div className="text-sm">{server.region}</div>
              </div>
              <div>
                {server.serverStatus
                  ? server?.serverStatus[0]?.status === "Maintenance"
                    ? "🔨"
                    : server?.serverStatus[0]?.status === "Full"
                    ? "🔴"
                    : server?.serverStatus[0]?.status === "Busy" ||
                      server?.serverStatus[0]?.status === "Busy "
                    ? "🟡"
                    : server?.serverStatus[0]?.status === "Good"
                    ? "🟢"
                    : "❓"
                  : null}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
