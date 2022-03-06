import Link from "next/link";
import { SupportMe } from "../Lists";

interface props {
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export const NavBar = ({
  bgColor = "bg-blue-700",
  textColor = "text-white",
  className = "",
}: props) => {
  return (
    <div
      className={`px-8 flex items-center justify-between py-4 shadow-sm ${textColor} ${bgColor} ${className}`}
    >
      <Link href="/" passHref replace>
        <div className="flex shadow border rounded-2xl p-1 pr-2 pl-2 hover:cursor-pointer">
          <p>
            <p className="font-bold inline">Lost Ark Status</p>
          </p>
        </div>
      </Link>
      <SupportMe />
    </div>
  );
};
