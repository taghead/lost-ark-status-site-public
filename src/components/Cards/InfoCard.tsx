interface props {
  heading?: string;
  body?: any;
  bgColor?: string;
  className?: string;
}

export const InfoCard = ({
  heading = "",
  body = "",
  bgColor = "bg-red-400",
  className,
}: props) => {
  return (
    <div
      className={`bg-white shadow rounded-2xl col-span-4 m-2 md:col-span-4 lg:col-span-1 ${className}`}
    >
      <div className={`h-1/6 rounded-t-2xl ${bgColor} p-2 font-bold`}>
        {heading}
      </div>
      <div className="p-2">{body}</div>
    </div>
  );
};
