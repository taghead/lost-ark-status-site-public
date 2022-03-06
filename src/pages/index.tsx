import type { NextPage } from "next";
import Head from "next/head";
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
  const tz: any =
    router.query.locale || Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [searchServerList, setSearchServerList] = useState(search || "");
  const [selectedServerId, setSelectedServerId] = useState(id || "");

  const renderServerList = (
    <ServerList
      className="col-span-4 lg:col-span-1 row-span-1 lg:row-span-4"
      serverList={serverList}
      searchServerList={searchServerList}
      setSearchServerList={setSearchServerList}
      setSelectedServerId={setSelectedServerId}
    />
  );

  const renderServerChart = (
    <ServerChart
      className="col-span-4 lg:col-span-3 row-span-3 lg:row-span-4"
      locale={locale}
      tz={tz}
      id={selectedServerId}
    />
  );

  const renderDashboard = (
    <>
      <div className="bg-white shadow rounded-2xl col-span-4 md:col-span-4 lg:col-span-1">
        <div className="h-1/6 rounded-t-2xl bg-red-400 p-2 font-bold">
          Get started
        </div>
        <div className="p-2">
          <p>Welcome to Lost Ark Status.</p>
          <br />
          <p>
            An unofficial website that keeps track of the status of Lost Ark
            servers.
          </p>
          <br />
          <p>To begin click on a server.</p>
        </div>
      </div>
      <div>
        Extra details
        <details>
          <summary>Your timezone is: (Click to reveal)</summary>
          {tz}
        </details>
      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>Lost Ark Status</title>
        <meta
          name="description"
          content="Unofficial Lost Ark status tracker. View server uptime, trends and more."
        />
        <meta property="og:title" content="Lost Ark server status" />
        <meta
          property="og:description"
          content="Unofficial Lost Ark status tracker. View server uptime, trends and more."
        />
        <meta property="og:url" content="https://lostarkstatus.xyz/" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="h-full w-full grid grid-cols-4 grid-rows-4 gap-4">
        {renderServerList}
        {id ? renderServerChart : renderDashboard}
      </div>
    </>
  );
};

export default Server;
