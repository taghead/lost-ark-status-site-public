import { updateUrl } from "../../../lib/updateUrl";
import { useRouter } from "next/router";

interface props {
  className?: any;
  serverList: any;
  searchServerList: any;
  selectedServerId: any;
  setSelectedServerId: any;
}

export const ServerItemList = ({
  className,
  serverList = [
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
  ],
  searchServerList = undefined,
  selectedServerId,
  setSelectedServerId,
}: props) => {
  const router = useRouter();
  return (
    <div
      className={`bg-white shadow-2xl p-2 overflow-y-scroll rounded-2xl m-2 h-full ${className}`}
    >
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
                  ? server?.serverStatus[0]?.status === "Offline"
                    ? "❌"
                    : server?.serverStatus[0]?.status === "Maintenance"
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
