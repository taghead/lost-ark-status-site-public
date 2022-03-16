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
      className={`w-full h-full bg-white shadow rounded-2xl m-2 ${className}`}
    >
      <div className={`h-min-fit rounded-t-2xl ${bgColor} p-2 font-bold`}>
        {heading}
      </div>
      <div className="h-min-fit p-2">{body}</div>
    </div>
  );
};
