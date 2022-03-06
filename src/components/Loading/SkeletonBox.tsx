interface props {
  className?: string;
  message?: string;
}

export const SkeletonBox = ({ className, message }: props) => {
  return (
    <div
      className={`flex items-center animate-pulse opacity-80 bg-gray-300 shadow rounded-2xl w-full ${className}`}
    >
      {message}
    </div>
  );
};
