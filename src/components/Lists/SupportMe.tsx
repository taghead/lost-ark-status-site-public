import { ButtonSm, BuyMeACoffee, KoFi } from "../Buttons";
import { CollapsedList } from ".";

import { useState } from "react";

interface props {}

export const SupportMe = ({}: props) => {
  const [visibility, setVisibility] = useState("invisible");

  // eslint-disable-next-line react/jsx-key
  const button = <ButtonSm href="" name="Support me" />;
  // eslint-disable-next-line react/jsx-key
  const items = [<BuyMeACoffee />, <KoFi />];

  return <CollapsedList bgColor="bg-red-500" button={button} items={items} />;
};
