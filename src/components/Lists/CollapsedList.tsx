import { useState } from "react";

interface props {
  name?: string;
  href?: string;
  icon?: any;
  button?: any;
  items?: any;
  width?: string;
  height?: string;
  bgColor?: string;
  className?: string;
}

export const CollapsedList = ({
  name = "Pizza Time",
  href = `${process.env.HOSTNAME}`,
  icon,
  // eslint-disable-next-line react/jsx-key
  items = [<div>Pizza Time</div>, <div>Pizza Time</div>],
  button = <div>Pizza Time</div>,
  width = "w-48",
  height = " h-8",
  bgColor = "bg-red-500",
  className,
}: props) => {
  const [visibility, setVisibility] = useState("invisible");

  return (
    <div
      className={`flex justify-between rounded-2xl z-40 ${visibility} ${bgColor} ${width} ${height} ${className}`}
      onClick={() => {
        if (visibility === "visible") setVisibility("invisible");
        else if (visibility === "invisible") setVisibility("visible");
      }}
    >
      <div key="Collapsed-List" className={`rounded-2xl ${bgColor} h-max`}>
        <div
          key="Collapsed-List-Button"
          className="hover:opacity-50 hover:cursor-pointer !visible"
        >
          {button}
        </div>
        {items.map((item: any, index: number) => {
          return (
            <div key={index} className="hover:opacity-50 m-2 pb-2">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
