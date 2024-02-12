import React from "react";
import Image from "next/image";
import caretleft from "../../components/assets/images/CaretLeft.svg";
import caretright from "../../components/assets/images/CaretRight.svg";

const Pagination = () => {
  return (
    <div className="flex items-center justify-center self-center">
      <button className="px-3 py-1 mx-1 text-black rounded-full">
        <Image src={caretleft} alt="left" />
      </button>

      <button className="px-3 py-1 mx-1 bg-[#373389] text-white rounded-full">
        1
      </button>
      <button className="px-3 py-1 mx-1 text-black rounded-full">2</button>
      <button className="px-3 py-1 mx-1  text-black rounded-full">3</button>
      <button className="px-3 py-1 mx-1 text-black rounded-full">
        <Image src={caretright} alt="right" />
      </button>
    </div>
  );
};

export default Pagination;
