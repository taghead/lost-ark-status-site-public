interface props {
  className?: string;
  searchServerList: any;
  setSearchServerList: any;
}

export const ServerSearchBar = ({
  className,
  searchServerList,
  setSearchServerList,
}: props) => {
  return (
    <div className={`bg-white shadow-2xl p-2 rounded-2xl m-2 ${className}`}>
      <input
        className="rounded border-2 p-2 m-2"
        type="text"
        placeholder="Search.."
        value={searchServerList}
        onChange={(el) => {
          setSearchServerList(el.target.value);
        }}
      />
    </div>
  );
};
