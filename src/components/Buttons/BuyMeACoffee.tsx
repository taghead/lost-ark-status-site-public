import { SupportButton } from "./SupportButton";
import { SiBuymeacoffee } from "react-icons/si";

export const BuyMeACoffee = () => {
  return (
    <SupportButton
      name="BuyMeACoffee"
      href="https://www.buymeacoffee.com/taghead"
      bgColor="bg-blue-500"
      icon={<SiBuymeacoffee />}
    />
  );
};
