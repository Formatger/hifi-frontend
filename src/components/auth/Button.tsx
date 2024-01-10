import React from "react";

interface ButtonProps {
  buttonText: string;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ buttonText, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`w-[260px] sm:w-[334px] h-[32px] ${
        disabled
          ? "bg-[#B0BABF] text-[#F9F9F7]"
          : "bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] text-stone-50 hover:text-[#6200EE]"
      } rounded-md flex flex-col justify-start items-center`}
    >
      <div className="self-stretch justify-center items-center gap-2 inline-flex">
        <div
          className={`text-poppins mt-1 grow shrink basis-0 text-center font-normal leading-normal`}
        >
          {buttonText}
        </div>
      </div>
    </button>
  );
};

export default Button;
