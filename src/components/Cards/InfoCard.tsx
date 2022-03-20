interface props {
  heading?: string;
  body?: any;
  bgColor?: string;
  className?: string;
  bodyClassName?: string;
}

export const InfoCard = ({
  heading = "",
  body = "",
  bgColor = "bg-red-400",
  className,
  bodyClassName,
}: props) => {
  return (
    <div
      className={`w-full h-full bg-white shadow rounded-2xl m-2 ${className}`}
    >
      <div className={`rounded-t-2xl ${bgColor} p-2 font-bold `}>{heading}</div>
      <div className={` p-2 ${bodyClassName}`}>{body}</div>
    </div>
  );
};
