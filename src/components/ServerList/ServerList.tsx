import { updateUrl } from "../../../lib/updateUrl";
import { useRouter } from "next/router";

interface props {
  serverList: any;
  searchServerList: any;
  setSearchServerList: any;
  setSelectedServerId: any;
  className: string;
}

export const ServerList = ({
  serverList,
  searchServerList,
  setSearchServerList,
  setSelectedServerId,
  className,
}: props) => {
  const router = useRouter();

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

      {serverList
        .filter(
          (server: any) =>
            server.name
              .toLowerCase()
              .includes(searchServerList.toLowerCase()) ||
            server.region.toLowerCase().includes(searchServerList.toLowerCase())
        )
        .map((server: any) => (
          <div
            className="flex  justify-between rounded bg-white hover:translate-x-2 shadow-2xl p-2 m-2 cursor-pointer"
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
  );
};
