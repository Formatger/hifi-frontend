import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatYAxisLabel = (value: number) => {
  return `${value}`;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload) {
    return (
      <div className="p-2 poppins-remove relative rounded-lg  bg-[#252C32] text-white">
        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-[#252C32] border-b-[10px] border-b-transparent absolute -left-[14px] top-[40%]"></div>
        {payload.map((entry, index) => (
          <p key={index} className={`text-${entry.color} uppercase `}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const randomColors = ["#D0CBF2", "#6418C3", "#6200ee"];

const TotalSales = ({ chartdata }: any) => {
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

  const currencies =
    Array.isArray(chartdata) && chartdata[0]
      ? Object.keys(chartdata[0]).filter((key) => key !== "monthName")
      : [];

  if (!currencies) {
    console.error("Invalid chart data format");
    return null;
  }

  const chartMargin =
    windowWidth < 768
      ? { left: 10, right: 10, top: 20, bottom: 5 }
      : { left: 30, right: 30, top: 20, bottom: 5 };

  return (
    <div
      className="w-full mr-auto border border-gray-200 rounded-2xl"
      style={{ boxShadow: "2px 4px 24px  rgba(0, 0, 0, 0.05)" }}
    >
      <div className="w-full flex justify-between items-center p-3">
        <h1 className="text-[#111012] text-base md:text-xl font-semibold poppins-remove leading-loose ">
          Total Sales
        </h1>
        <div className="flex items-center gap-3">
          {currencies.map((currency: any, index: any) => (
            <p
              className="flex items-center text-xs text-[#4B5563] uppercase"
              key={currency}
            >
              <span
                style={{ backgroundColor: randomColors[index] }}
                className={` h-2 w-2 rounded-full mr-2`}
              ></span>
              {currency}
            </p>
          ))}

          {/* <p className="flex items-center text-xs text-[#4B5563]">
            <span className="bg-[#6418C3] h-2 w-2 rounded-full mr-2"></span>{" "}
            USDC
          </p> */}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={343}>
        <BarChart data={chartdata} margin={chartMargin}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="monthName"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={[1, "auto"]}
            tickFormatter={formatYAxisLabel}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            width={20}
          />
          <Tooltip content={<CustomTooltip />} />
          {currencies.map((currency: any, index: any) => (
            <Bar
              key={currency}
              dataKey={currency}
              stackId="a"
              fill={`${randomColors[index]}`}
              barSize={5}
              radius={[5, 5, 5, 5]}
            />
          ))}
          {/* <Bar
            dataKey="eth"
            stackId="a"
            fill="#D0CBF2"
            barSize={5}
            radius={[5, 5, 5, 5]}
          />
          <Bar
            dataKey="btc"
            stackId="a"
            fill="#6418C3"
            barSize={5}
            radius={[5, 5, 5, 5]}
          />
          <Bar
            dataKey="usdc"
            stackId="a"
            fill="#6200ee"
            barSize={5}
            radius={[5, 5, 5, 5]}
          /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalSales;
