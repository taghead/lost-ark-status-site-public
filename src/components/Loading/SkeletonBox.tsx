interface props {
  animatePulse?: boolean;
  className?: string;
  message?: any;
}

export const SkeletonBox = ({
  animatePulse = true,
  className,
  message,
}: props) => {
  return (
    <div
      className={`grid grid-rows-3 grid-flow-col opacity-80 bg-gray-300 shadow rounded-2xl w-full ${
        animatePulse ? `animate-pulse` : ""
      } ${className}`}
    >
      <div className="col-start-2 row-start-2 h-96 w-96 ">{message}</div>
    </div>
  );
};
