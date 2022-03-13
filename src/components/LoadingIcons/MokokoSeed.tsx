import Image from "next/image";

interface props {}

export const MokokoSeed = ({}: props) => {
  return (
    <Image
      src="/LoadingIcons/MokokoSeed/index.svg"
      alt="An SVG of an eye"
      height="120"
      width="120"
      layout="responsive"
    />
  );
};
