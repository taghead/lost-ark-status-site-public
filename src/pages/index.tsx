import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InfoCard } from "../components/Cards";
import { ServerChart } from "../components/ServerChart";
import { ServerList } from "../components/ServerList";

const Server: NextPage = () => {
  const router = useRouter();
  const id: any = router.query.id || undefined;
  const locale: any = router.query.locale || "en-US";
  const tz: any =
    router.query.locale || Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [selectedServerId, setSelectedServerId] = useState(id || "");

  const renderServerList = (
    <ServerList
      selectedServerId={selectedServerId}
      className="col-span-4 lg:col-span-1 row-span-1 lg:row-span-4"
      setSelectedServerId={setSelectedServerId}
    />
  );

  const renderServerChart = (
    <ServerChart
      className="col-span-4 lg:col-span-3 row-span-3 lg:row-span-4"
      locale={locale}
      tz={tz}
      id={selectedServerId || id}
    />
  );

  const renderDashboard = (
    <>
      <InfoCard
        heading="Get started"
        body={
          <>
            <p>
              Lost Ark Status is the unofficial website that keeps track of the
              status of game servers.
            </p>
            <br />
            <p>Try giving one of the servers a click.</p>
          </>
        }
      />
      <InfoCard
        heading="Timezone"
        body={
          <>
            <p>
              Your current timezone is set to <b>{tz}</b>
            </p>
          </>
        }
      />
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
