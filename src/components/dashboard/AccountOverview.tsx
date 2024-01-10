import React, { useEffect, useState } from "react";
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

const formatYAxisLabel = (value: number, index: number) => {
  if (value === 0) {
    return "";
  }
  if (value >= 1000) {
    return `${value / 1000}k`;
  }
  return value.toString();
};

const AccountOverview = ({ data, value }: any) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();

    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const chartMargin =
    windowWidth < 768
      ? { left: 10, right: 10, top: 20, bottom: 5 }
      : { left: 30, right: 30, top: 20, bottom: 5 };

  return (
    <div
      className="w-full border border-gray-200 rounded-2xl"
      style={{ boxShadow: "2px 4px 24px  rgba(0, 0, 0, 0.05)" }}
    >
      <h1 className=" text-[#111012] text-base md:text-xl font-semibold text-poppins leading-loose p-3">
        Account Overview
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-between px-3 mb-3 gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <p className=" text-[#111012] text-base md:text-xl font-semibold text-poppins capitalize leading-loose">
            Total Revenue
          </p>
          <p className="text-[#6200EE] text-base md:text-xl font-semibold text-poppins capitalize leading-loose">
            {value ? formatCurrency(value) : 0} USD
          </p>
        </div>
        {data?.legth > 12 && (
          <>
            {" "}
            <select
              id="dateRangeSelect"
              className="bg-[white] text-poppins w-[120px] h-8 px-2.5 py-1 text-[#111012] cursor-pointer rounded border border-gray-400"
            >
              <option value="6months" className="cursor-pointer">
                6 Months
              </option>
              <option value="1year" className="cursor-pointer">
                1 Year
              </option>
              <option value="2years" className="cursor-pointer">
                2 Years
              </option>
            </select>
          </>
        )}
      </div>

      <>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={chartMargin}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6200EE70" />
                <stop offset="100%" stopColor="#C751FF0D" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="monthName"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#6A7781",
                className: "custom-axis-label",
              }}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={formatYAxisLabel}
              tick={{
                fontSize: 12,
                fill: "#6A7781",
                letterSpacing: "0.24px",
                className: "custom-axis-label",
              }}
              width={20}
              axisLine={false}
              tickLine={false}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#6200EE"
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </>
    </div>
  );
};

export default AccountOverview;
