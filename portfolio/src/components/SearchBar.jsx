import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
      />

      <input
        type="text"
        className="
          w-full bg-white rounded-2xl py-2 md:py-1 pl-4 pr-10  lg:p-2.5
          text-sm  text-gray-800 outline-none border border-gray-200
          focus:border-primary transition
        "
      />
    </div>
  );
}

export default SearchBar;
