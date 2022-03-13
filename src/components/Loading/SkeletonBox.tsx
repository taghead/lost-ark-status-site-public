interface props {
  className?: string;
  message?: any;
}

export const SkeletonBox = ({ className, message }: props) => {
  return (
    <div
      className={`grid grid-rows-3 grid-flow-col animate-pulse opacity-80 bg-gray-300 shadow rounded-2xl w-full ${className}`}
    >
      <div className="col-start-2 row-start-2 h-96 w-96 ">{message}</div>
    </div>
  );
};
