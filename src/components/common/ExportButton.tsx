import React, { ButtonHTMLAttributes } from "react";
import Image from "next/image";

interface ExportButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  iconSrc?: string;
  label: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  bgColor = "#F6F8F9",
  iconSrc,
  label,
  ...props
}: ExportButtonProps) => {
  return (
    <button
      style={{ backgroundColor: bgColor }}
      className="px-5 py-1 bg-[#F6F8F9] rounded-md border blue-text border-[#E5E9EB] justify-start items-center gap-2 flex"
      {...props}
    >
      {iconSrc && (
        <div className="w-6 h-6 p-0.5 justify-center items-center flex">
          <div className="w-5 h-5 relative flex-col justify-start items-start flex">
            <Image src={iconSrc} alt={`${label} Icon`} />
          </div>
        </div>
      )}
      <div
        className={`text-remove  font-remove poppins-remove leading-normal max-sm:text-sm`}
      >
        {label}
      </div>
    </button>
  );
};

export default ExportButton;
