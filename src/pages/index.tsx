import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InfoCard } from "../components/Cards";
import { ServerChart } from "../components/ServerChart";
import { ServerList, ServerListDivider } from "../components/ServerList";
import { HealthCheck } from "../components/HealthCheck";

const Server: NextPage = () => {
  const router = useRouter();
  const id: any = router.query.id || undefined;
  const locale: any =
    router.query.locale ||
    Intl.DateTimeFormat().resolvedOptions().locale ||
    "en-US";
  const tz: any =
    router.query.locale || Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [selectedServerId, setSelectedServerId] = useState(id || "");

  return (
    <div className="gap-4 lg:grid lg:grid-cols-4 lg:grid-rows-3">
      <ServerList
        selectedServerId={selectedServerId}
        className="lg:col-span-1 lg:row-span-4"
        setSelectedServerId={setSelectedServerId}
      />

      {id ? (
        // If server has been selected
        <>
          <ServerChart
            className="hidden lg:col-span-3 lg:row-span-4 lg:block"
            locale={locale}
            tz={tz}
            id={selectedServerId || id}
            responsive={true}
          />
          <div className="m-4 grid grid-cols-1 grid-row-1 lg:hidden ">
            <ServerChart
              className="lg:col-span-3 lg:row-span-4"
              locale={locale}
              tz={tz}
              id={selectedServerId || id}
              responsive={true}
              maintainAspectRatio={true}
            />
          </div>
        </>
      ) : (
        // If server has not been selected
        <div className="lg:col-span-3 lg:row-span-3">
          <div className="lg:grid lg:grid-cols-3 lg:gap-4">
            <InfoCard
              heading="Get started"
              body={
                <>
                  <p>
                    Lost Ark Status is the unofficial website that keeps track
                    of the status of game servers.
                  </p>
                  <br />
                  <p>Try giving the search box a go by typing Zinnervale.</p>
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
            <InfoCard
              heading="Health Check"
              body={
                <>
                  <HealthCheck />
                </>
              }
            />
            <InfoCard
              heading="Servers"
              body={
                <>
                  <ServerListDivider
                    selectedServerId={selectedServerId}
                    setSelectedServerId={setSelectedServerId}
                    className="h-64"
                  />
                </>
              }
              className="col-span-3 h-max"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Server;
