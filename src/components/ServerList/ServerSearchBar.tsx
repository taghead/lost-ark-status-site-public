interface props {
  className?: string;
  searchServerList: any;
  setSearchServerList: any;
  buttons: any;
}

export const ServerSearchBar = ({
  className,
  searchServerList,
  setSearchServerList,
  buttons,
}: props) => {
  return (
    <div className={`bg-white shadow-2xl p-2 rounded-2xl w-full ${className}`}>
      <input
        className="rounded border-2 p-2 w-full"
        type="text"
        placeholder="Search.."
        value={searchServerList}
        onChange={(el) => {
          setSearchServerList(el.target.value);
        }}
      />
      {buttons}
    </div>
  );
};
