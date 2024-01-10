import React from "react";
import Image from "next/image";
import dots from "../../assets/images/Dot.svg";

interface ActivityProps {
  activity: string;
  time: string;
}

const Activity: React.FC<ActivityProps> = ({ activity, time }) => {
  return (
    <div className="w-full  bg-white flex items-start gap-2 whitespace-nowrap">
      <div className="flex flex-col w-5 justify-center items-center">
        <div style={{ width: "16px", height: "16px" }}>
          <Image src={dots} alt="Dots" />
        </div>
        <div className="w-[2px] h-14 bg-gray-200"></div>
      </div>
      <div className=" h-full p-2 w-[95%] rounded-lg border border-gray-200 flex flex-col items-start gap-2">
        <p className="text-[#4B5563] whitespace-normal w-[95%] text-sm lg:text-base text-poppins">
          {activity}
        </p>
        <p className="text-[#4B5563] text-xs lg:text-sm text-poppins">{time}</p>
      </div>
    </div>
  );
};

export default Activity;
