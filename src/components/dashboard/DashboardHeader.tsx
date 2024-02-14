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
  purchasesData: { start: "#5E5BFFBF", end: "#8FD0FF24" },
  revenueData: { start: "#5E5BFFBF", end: "#8FD0FF24" },
  customersData: { start: "#5E5BFFBF", end: "#8FD0FF24" },
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
      <ResponsiveContainer width={120} height={75}>
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
    <div className="dash-header">
      {sections.map((section: any, index: any) => (
        <div
          key={index}
          className="dash-header-box"
        >
          <div>
            <p className="h7">
              {section.title}
            </p>
            <div className="row-wrap mt-1">
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
                        className="arrow-up"
                      />
                    </>
                  )}
                </>
              )}

              {/* {section.dataType === "customersData" && (
                <MdTrendingDown className="bg-[#ffffe6] text-red-600 w-4 h-4 rounded-full p-[2px]" />
              )} */}
              {section.change && (
                <p className="h9">
                  {section?.change}%
                </p>
              )}
            </div>
            <p className="h7 mt-4">
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
