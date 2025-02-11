import SearchIcon from "../../../../../public/svg/searchIcon";

const SearchBar = () => {
  return (
    <form className="border border-blue-500 flex-grow w-full">
      <div className="flex bg-gray-100 items-center px-4 h-12 rounded-full w-full">
        <SearchIcon opacity="light" className="mr-4" />
        <input
          type="text"
          placeholder="Search for products..."
          className="bg-gray-100 flex-grow w-full"
        />
      </div>
    </form>
  );
};

export default SearchBar;
