interface props {
  text: string;
  toggled: boolean;
  bgColor?: string;
  width?: string;
  height?: string;
  onClick: any;
  className?: string;
}

export const Toggle = ({
  text = "Toggle me",
  toggled = false,
  bgColor = "bg-white",
  width = "w-full",
  height = "h-12",
  onClick,
  className,
}: props) => {
  return (
    <div
      className={`flex justify-between select-none cursor-pointer rounded-2xl p-2 ${bgColor} ${width} ${height} ${className}`}
      onClick={onClick}
    >
      <div className="">
        <p className=" text-black font-black">{text}</p>
      </div>
      <div className="pr-4">
        {toggled ? (
          <div className="w-6 h-2 rounded-full bg-green-400" />
        ) : (
          <div className="w-6 h-2 rounded-full border" />
        )}
      </div>
    </div>
  );
};
