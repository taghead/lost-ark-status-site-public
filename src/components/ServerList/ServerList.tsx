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
  const [showOffline, setShowOffline] = useState(false);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/server`,
    fetcher
  );

  if (error)
    return <div>An error has occurred. Unable to load server status.</div>;
  if (!data) return <SkeletonBox className={className} />;

  return (
    <div className={`grid grid-rows-6 h-full ${className}`}>
      <div className="row-span-3 lg:row-span-1 m-4">
        <ServerSearchBar
          className="h-min"
          searchServerList={searchServerList}
          setSearchServerList={setSearchServerList}
        />
        <div className="grid grid-cols-2 grid-rows-3 mt-2">
          <Toggle
            className="col-span-1"
            text="Offline"
            toggled={showOffline}
            onClick={() => {
              setShowOffline(!showOffline);
            }}
          />
        </div>
      </div>
      <ServerItemList
        className="row-span-3 lg:row-span-5"
        serverList={data}
        searchServerList={searchServerList}
        selectedServerId={selectedServerId}
        setSelectedServerId={setSelectedServerId}
        showOffline={showOffline}
      />
    </div>
  );
};
