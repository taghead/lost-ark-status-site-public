interface props {
  name?: string;
  href?: string;
  icon?: any;
  width?: string;
  height?: string;
  bgColor?: string;
  className?: string;
}

export const SupportButton = ({
  name = "Pizza Time",
  href = `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  icon,
  width = "w-48",
  height = "h-16",
  bgColor = "bg-red-500",
  className,
}: props) => {
  return (
    <div
      className={`flex justify-between rounded-2xl ${bgColor} ${width} ${height} ${className}`}
    >
      <a className="flex p-4" href={href}>
        <div className="text-4xl mr-2 ">{icon}</div>
        <div>
          <p className="text-sm">Support me on</p>
          <p className=" text-white font-black">{name}</p>
        </div>
      </a>
    </div>
  );
};
