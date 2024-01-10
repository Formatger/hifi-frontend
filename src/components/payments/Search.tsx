import React from "react";
import Image from "next/image";
import search from "../assets/images/Search.svg";

interface SearchProps {
  width?: string;
}

const Search: React.FC<SearchProps> = ({ width = "182px" }) => {
  return (
    <div className={`w-[${width}] relative flex items-center max-sm:w-[100%]`}>
      <input
        type="search"
        className="border-gray-400 border rounded-2xl h-9 pl-10 w-full px-3"
      />
      <Image
        src={search}
        alt="search"
        className="absolute left-3"
        width={20}
        height={20}
      />
    </div>
  );
};

export default Search;
