import { useRouter } from "next/router";
import { SkeletonBox } from "../../components/Loading";
import useSWR from "swr";
import { useState } from "react";
import axios from "axios";
import { ServerItemList } from "./ServerItemList";
import { ServerSearchBar } from "./ServerSearchBar";
import { InfoCard } from "../Cards";

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

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/server`,
    fetcher
  );

  if (error)
    return <div>An error has occurred. Unable to load server status.</div>;
  if (!data) return <SkeletonBox className={className} />;

  return (
    <div className={`grid grid-rows-6 h-full ${className}`}>
      <div>
        <InfoCard
          className="m-2 p-2"
          bgColor="bg-blue-200"
          heading="Mokoko Says"
          body={
            <>
              <p>Welcome to Lost Ark Status.</p>
            </>
          }
        />
        <ServerSearchBar
          className=""
          searchServerList={searchServerList}
          setSearchServerList={setSearchServerList}
        />
      </div>
      <ServerItemList
        className="row-span-5"
        serverList={data}
        searchServerList={searchServerList}
        selectedServerId={selectedServerId}
        setSelectedServerId={setSelectedServerId}
      />
    </div>
  );
};
