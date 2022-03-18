import { updateUrl, convertStatus } from "../../../lib/utils";
import { useRouter } from "next/router";
import { InfoCard } from "../Cards";

interface props {
  className?: any;
  serverList: any;
  searchServerList: any;
  selectedServerId: any;
  setSelectedServerId: any;
  showOffline: any;
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
  showOffline = false,
}: props) => {
  const router = useRouter();
  return (
    <div
      className={`bg-white shadow-2xl p-2 overflow-y-auto rounded-2xl h-full ${className}`}
    >
      <div>
        {serverList.filter(
          (server: any) =>
            server.name
              .toLowerCase()
              .includes(searchServerList.toLowerCase()) ||
            server.region.toLowerCase().includes(searchServerList.toLowerCase())
        ).length ? (
          serverList
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
                className={`flex justify-between rounded bg-white ${
                  server.serverStatus[0]?.status === "Offline" &&
                  showOffline === false
                    ? "hidden"
                    : "visible"
                } ${
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
                  <h2 className="tracking-widest">{server.name}</h2>
                  <h3 className="text-sm">{server.region}</h3>
                </div>
                <div>
                  {convertStatus(server?.serverStatus[0]?.status, {
                    emoji: true,
                  })}
                </div>
              </div>
            ))
        ) : (
          <div className="mr-4">
            <InfoCard
              heading="You have unlocked no server found mode."
              bgColor="bg-blue-200"
              body={
                <div>
                  <br /> +0 Strength <br /> +0 Stamina
                  <br /> +0 Mana, <br />
                  <br /> Enjoy. :)
                </div>
              }
            />
            {/* You have unlocked no server found mode.  */}
          </div>
        )}
      </div>
    </div>
  );
};
