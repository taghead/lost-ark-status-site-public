import { SupportButton } from "./SupportButton";
import { SiKofi } from "react-icons/si";

export const KoFi = () => {
  return (
    <SupportButton
      name="KoFi"
      href="https://ko-fi.com/taghead"
      bgColor="bg-yellow-500"
      icon={<SiKofi />}
    />
  );
};
