import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InfoCard } from "../components/Cards";
import { ServerChart } from "../components/ServerChart";
import { ServerList } from "../components/ServerList";

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
    <div className="h-full gap-4 lg:grid lg:grid-cols-4 lg:grid-rows-4">
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
            maintainAspectRatio={false}
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
        <div className="md:flex lg:col-span-3 lg:row-span-3">
          <InfoCard
            heading="Get started"
            body={
              <>
                <p>
                  Lost Ark Status is the unofficial website that keeps track of
                  the status of game servers.
                </p>
                <br />
                <p>Try giving one of the servers a click.</p>
              </>
            }
            className="lg:h-fit lg:w-96"
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
            className="lg:h-fit lg:w-96"
          />
        </div>
      )}
    </div>
  );
};

export default Server;
