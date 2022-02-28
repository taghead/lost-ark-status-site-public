import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import prisma from "../../lib/prisma";
import ServerChart from "../components/ServerChart";

interface props {
  serverList: any;
}

export async function getServerSideProps() {
  const serverList = await prisma.server
    .findMany({
      orderBy: [
        {
          name: "asc",
        },
      ],
      include: {
        serverStatus: {
          orderBy: {
            createdAt: "asc",
          },
          take: 1,
        },
      },
    })
    .then((servers) => {
      return JSON.parse(JSON.stringify(servers));
    });

  // Pass data to the page via props
  return { props: { serverList } };
}

const Server: NextPage<props> = ({ serverList }) => {
  const router = useRouter();
  const id: any = router.query.id || undefined;
  const search: any = router.query.search || undefined;
  const locale: any = router.query.locale || "en-US";
  const tz: any = router.query.locale || "Australia/Sydney";

  const [searchServerList, setSearchServerList] = useState(search || "");
  const [selectedServerId, setSelectedServerId] = useState(id || "");

  function updateUrl(states: any) {
    const arrOfUrlStates = [
      { key: "id", value: states?.id || selectedServerId },
      { key: "search", value: states?.search || searchServerList },
    ];

    let counter = 0;

    const url = arrOfUrlStates.map((state) => {
      if (state.value && counter === 0) {
        counter++;
        return `/?${state.key}=${state.value}`;
      }

      if (state.value) {
        return `&${state.key}=${state.value}`;
      }
    });

    router.push(url.join("") || "", undefined, {
      shallow: true,
    });
  }

  return (
    <div className="h-full w-full grid grid-cols-4 gap-4">
      {/* Server List */}

      <div className="bg-white shadow-2xl p-2 overflow-y-scroll">
        <input
          className="rounded  border-2 p-2 m-2"
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
              server.region
                .toLowerCase()
                .includes(searchServerList.toLowerCase())
          )
          .map((server: any) => (
            <div
              className="flex  justify-between rounded bg-white hover:translate-x-2 shadow-2xl p-2 m-2 cursor-pointer"
              key={server.id}
              onClick={() => {
                setSelectedServerId(server.id);
                updateUrl({ id: server.id });
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

      {/* Server Charts */}

      <ServerChart
        className="col-span-3"
        locale={locale}
        tz={tz}
        id={selectedServerId}
      />
    </div>
  );
};

export default Server;
