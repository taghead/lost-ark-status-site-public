import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import prisma from "../../lib/prisma";
import { ServerChart } from "../components/ServerChart";
import { ServerList } from "../components/ServerList";

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

  const renderServerList = (
    <ServerList
      serverList={serverList}
      searchServerList={searchServerList}
      setSearchServerList={setSearchServerList}
      setSelectedServerId={setSelectedServerId}
    />
  );

  const renderServerChart = (
    <ServerChart
      className="col-span-3"
      locale={locale}
      tz={tz}
      id={selectedServerId}
    />
  );

  return (
    <div className="h-full w-full grid grid-cols-4 gap-4">
      {renderServerList}
      {renderServerChart}
    </div>
  );
};

export default Server;
