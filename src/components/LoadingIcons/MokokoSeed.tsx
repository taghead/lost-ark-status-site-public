import Image from "next/image";

interface props {
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | undefined;
  className?: string;
  height?: string;
  width?: string;
}

export const MokokoSeed = ({
  className,
  layout = "responsive",
  height = "120",
  width = "120",
}: props) => {
  return (
    <Image
      src="/LoadingIcons/MokokoSeed/index.svg"
      alt="Loading..."
      height={height}
      width={width}
      layout={layout}
      className={`${className}`}
    />
  );
};
