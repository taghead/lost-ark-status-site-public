import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useSWR from "swr";
import axios from "axios";
import { SkeletonBox } from "../Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface props {
  id: string;
  locale: string;
  tz: string;
  className: string;
}

const fetcher = (id: number) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/server/id/${id}`)
    .then((res: any) => {
      const data = res.data;
      data?.serverStatus.reverse();
      data?.serverStatus?.push({
        createdAt: new Date().toISOString(),
        status: data?.serverStatus[data.serverStatus.length - 1]?.status,
      });

      return data;
    });
};

export const ServerChart = ({
  id = "",
  locale = "en-US",
  tz = Intl.DateTimeFormat().resolvedOptions().timeZone,
  className,
}: props) => {
  const { data, error } = useSWR(id, fetcher);

  if (error)
    return <div>An error has occurred. Unable to load server status.</div>;
  if (!data) return <SkeletonBox className={className} />;

  const server = data;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value: any) {
            return value === 4
              ? "Maintenance"
              : value === 3
              ? "Full"
              : value === 2
              ? "Busy"
              : value === 1
              ? "Good"
              : null;
          },
        },
      },
    },
  };

  const chartLabels = server?.serverStatus?.map((status: any) => {
    return new Date(status.createdAt).toLocaleString(locale, { timeZone: tz });
  });

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: server?.name,
        data: server?.serverStatus?.map((status: any) => {
          return status.status.includes("Maintenance")
            ? 4
            : status.status.includes("Full")
            ? 3
            : status.status.includes("Busy")
            ? 2
            : status.status.includes("Good")
            ? 1
            : null;
        }),
        borderColor: "#ff0000",
        stepped: true,
      },
    ],
  };

  return (
    <div className={`bg-white rounded-2xl p-4 ${className}`}>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

export default ServerChart;
