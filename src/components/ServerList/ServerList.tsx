import { useRouter } from "next/router";
import { SkeletonBox } from "../../components/Loading";
import useSWR from "swr";
import { useState } from "react";
import axios from "axios";
import { ServerItemList } from "./ServerItemList";
import { ServerSearchBar } from "./ServerSearchBar";
import { Toggle } from "../Toggle";

interface props {
  selectedServerId: any;
  setSelectedServerId: any;
  className: string;
}

const fetcher = (url: string) => {
  return axios
    .get(url)
    .then((res: any) => {
      const data = res.data;
      return data;
    })
    .catch((err) => {
      return null;
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
  const [showOffline, setShowOffline] = useState(true);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/server`,
    fetcher
  );

  if (error)
    return <div>An error has occurred. Unable to load server status.</div>;
  if (!data) return <SkeletonBox className={`h-min max-h-full`} />;

  return (
    <div className={`h-min max-h-full w-full flex-col ${className}`}>
      <div className="">
        <ServerSearchBar
          className="h-min w-full"
          searchServerList={searchServerList}
          setSearchServerList={setSearchServerList}
          buttons={
            <>
              <Toggle
                className="w-24"
                text="Offline"
                toggled={showOffline}
                onClick={() => {
                  setShowOffline(!showOffline);
                }}
              />
              <ServerItemList
                className="h-full max-h-64 w-full mt-4"
                serverList={data}
                searchServerList={searchServerList}
                selectedServerId={selectedServerId}
                setSelectedServerId={setSelectedServerId}
                showOffline={showOffline}
              />
            </>
          }
        />
      </div>
    </div>
  );
};
