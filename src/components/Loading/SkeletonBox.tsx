interface props {
  animatePulse?: boolean;
  className?: string;
  message?: any;
  messageHeight?: string;
  messageWidth?: string;
}

export const SkeletonBox = ({
  animatePulse = true,
  className,
  message,
  messageHeight = "h-48",
  messageWidth = "w-48",
}: props) => {
  return (
    <div
      className={` gap-4 opacity-80 bg-gray-300 shadow rounded-2xl w-full h-full ${
        animatePulse ? `animate-pulse` : ""
      } ${className}`}
    >
      <div className="flex justify-center items-center h-full">
        <div className={`${messageHeight} ${messageWidth}`}>{message}</div>
      </div>
    </div>
  );
};
