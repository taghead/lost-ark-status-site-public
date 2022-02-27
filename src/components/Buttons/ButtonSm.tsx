interface props {
  name?: string;
  href?: string;
  icon?: any;
  width?: string;
  height?: string;
  bgColor?: string;
  className?: string;
}

export const ButtonSm = ({
  name = "Pizza Time",
  href = `${process.env.HOSTNAME}`,
  icon,
  width = "w-48",
  height = "h-8",
  bgColor = "bg-red-500",
  className,
}: props) => {
  return (
    <div
      className={`rounded-2xl text-center p-1 ${bgColor} ${width} ${height} ${className}`}
    >
      <p className=" text-white font-black">{name}</p>
    </div>
  );
};
