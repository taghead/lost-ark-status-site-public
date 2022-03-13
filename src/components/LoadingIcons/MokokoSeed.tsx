import Image from "next/image";

interface props {}

export const MokokoSeed = ({}: props) => {
  return (
    <Image
      src="/LoadingIcons/MokokoSeed/index.svg"
      alt="Loading..."
      height="120"
      width="120"
      layout="responsive"
    />
  );
};
