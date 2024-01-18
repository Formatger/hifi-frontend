import React from "react";
import Image from "next/image";
import { MdTrendingDown } from "react-icons/md";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/utils/formatCurrency";

const gradientColors: any = {
  purchasesData: { start: "#6418C370", end: "#C751FF0D" },
  revenueData: { start: "#9A98FFBF", end: "#8FD0FF24" },
  customersData: { start: "#FF967E80", end: "#FFC67221" },
};

const zeroChartData = {
  data: [
    { day: 3, month: 11, customers: 1, totalAmount: 1, purchase: 1 },
    {
      day: 8,
      month: 11,
      customers: 1,
      totalAmount: 1,
      purchase: 1,
    },
  ],
};

const Chart = ({ data, dataType, valueName }: any) => {
  const gradientId = `colorGradient-${dataType}`;

  const gradientStartColor = gradientColors[dataType].start;
  const gradientEndColor = gradientColors[dataType].end;

  return (
    <div className="">
      <ResponsiveContainer width={136} height={75}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientStartColor} />
              <stop offset="100%" stopColor={gradientEndColor} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            horizontal={false}
          />
          <XAxis dataKey="month" hide />
          <YAxis domain={[1, "auto"]} hide />
          <Area
            type="monotone"
            dataKey={valueName}
            stroke={gradientStartColor}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const DashboardHeader = ({ sections }: any) => {
  return (
    <div className="w-full md:h-[146px] bg-white rounded-2xl border border-[#E5E9EB] flex justify-center items-center flex-col md:flex-row p-5 gap-5 md:gap-0">
      {sections.map((section: any, index: any) => (
        <div
          key={index}
          className={`h-[106px] w-full flex md:w-[33.333%] text-sm items-center ${
            index === 0
              ? "justify-center lg:justify-start"
              : index === 2
              ? "justify-end"
              : "justify-center"
          } ${index !== 2 ? "lg:border-r border-[#E5E9EB]" : ""}`}
        >
          <div className="flex-col justify-center items-center gap-4">
            <h1 className="text-[#4B5563] text-sm xl:text-base font-semibold poppins-remove ">
              {section.title}
            </h1>
            <div className="flex items-center gap-[6.11px]">
              {section?.icon === "n/a" ? (
                <></>
              ) : (
                <>
                  {" "}
                  {section?.icon && (
                    <>
                      <Image
                        src={section.icon}
                        alt="icon"
                        className="bg-[#F0FDF4] w-4 h-4 rounded-full p-[2px]"
                      />
                    </>
                  )}
                </>
              )}

              {/* {section.dataType === "customersData" && (
                <MdTrendingDown className="bg-[#ffffe6] text-red-600 w-4 h-4 rounded-full p-[2px]" />
              )} */}
              {section.change && (
                <p className="text-[#4B5563] text-xs font-normal poppins-remove leading-[18px] tracking-tight">
                  {section?.change}%
                </p>
              )}
            </div>
            <p className="text-[#252C32] mt-4 text-sm xl:text-xl font-semibold poppins-remove capitalize">
              {section?.dataType === "revenueData"
                ? formatCurrency(section?.value)
                : section?.value}
            </p>
          </div>
          {section?.data && (
            <Chart
              data={section?.data}
              dataType={section?.dataType}
              valueName={section?.valueName}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardHeader;
