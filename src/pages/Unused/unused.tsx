import React, { useEffect, useState } from "react";

const Unused = () => {
  return (
    <div>

     {/* Toggle Buttton */}

      <div className="flex items-center py-6 gap-5">
        <div className="">
          <ToggleButton />
        </div>
        <div className="flex flex-col">
          <p className="text-[#111012] text-remove font-semibold poppins-remove leading-normal">
            Require two-step authentication for your team
          </p>
          <p className=" text-[#4B5563] text-remove  font-remove poppins-remove leading-normal">
            This will require any team member without two-step
            authentication to enable it the next time they sign in.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Unused;


const ToggleButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label htmlFor="toggle" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id="toggle"
          className="sr-only"
          checked={isChecked}
          onChange={toggle}
        />
        <div
          className={`block w-14 h-8 rounded-full ${
            isChecked ? "bg-[#7856E4]" : "bg-zinc-100"
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition-transform ${
            isChecked ? "translate-x-full bg-white" : "bg-[#E5E9EB]"
          }`}
        ></div>
      </div>
    </label>
  );
};