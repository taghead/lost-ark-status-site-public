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
      Welcome to Lost Ark server checker. Lets see how the Lost Ark servers
      are...
      <SupportMe key="" />
    </div>
  );
};
