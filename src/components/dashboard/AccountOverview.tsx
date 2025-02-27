import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer } from "recharts";
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
    <div className="databox">
        <h4 className="">
          Account Overview
        </h4>
      <div className="databox-content">
        <div className="row-wrap-2">
          <h6>
            Total Revenue
          </h6>
          <h6 className="blue-text">
            {value ? formatCurrency(value) : 0} USD
          </h6>
        </div>
        {data?.legth > 12 && (
          <>
            {" "}
            <select
              id="dateRangeSelect"
              className="select-input"
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

        <ResponsiveContainer className="mt-3" width="100%" height={300}>
          <AreaChart data={data} margin={chartMargin}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5E5BFFBF" />
                <stop offset="100%" stopColor="#8FD0FF24" />
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
