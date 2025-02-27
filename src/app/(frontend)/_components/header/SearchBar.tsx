import SearchIcon from "../../../../../public/svg/searchIcon";

const SearchBar = () => {
  return (
    <form className="flex-grow w-full">
      <div className="flex bg-gray-100 items-center px-4 h-12 rounded-full w-full">
        <SearchIcon opacity="light" className="mr-4" />
        <input
          type="text"
          placeholder="Search for products..."
          className="bg-gray-100 flex-grow w-full outline-none"
        />
      </div>
    </form>
  );
};

export default SearchBar;
