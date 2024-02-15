import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import Image from "next/image";

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
      <div className="tooltip-box">
        <div className="tooltip-arrow"></div>
         {payload.map((entry, index) => (
         <p key={index}>     
         <span
         style={{ backgroundColor: randomColors[index] }}
                className="chart-dot">
        </span>       
         {`${entry.name}: $${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const randomColors = ["#D0CBF2", "#8d83fb", "#5545fa"];

// const TotalSales = ({ chartdata }: any) => {

const TotalSales = () => {
  // Hardcoded data 
  const chartdata = [
    { monthName: "Jan", eth: 2000, btc: 3000, usdc: 3000 },
    { monthName: "Feb", eth: 2500, btc: 3500, usdc: 4500 },
    { monthName: "Mar", eth: 1800, btc: 3800, usdc: 4800 },
    { monthName: "Apr", eth: 3000, btc: 4000, usdc: 5000 },
    { monthName: "May", eth: 3200, btc: 4200, usdc: 5200 },
    { monthName: "Jun", eth: 3400, btc: 4400, usdc: 5400 },
    { monthName: "Jul", eth: 3600, btc: 4600, usdc: 5600 },
    { monthName: "Aug", eth: 3800, btc: 4800, usdc: 5800 },
    { monthName: "Sep", eth: 4000, btc: 5000, usdc: 6000 },
    { monthName: "Oct", eth: 4200, btc: 5200, usdc: 6200 },
    { monthName: "Nov", eth: 3600, btc: 4600, usdc: 5600 },
    { monthName: "Dec", eth: 4000, btc: 5000, usdc: 6000 },
  ];

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
    <div className="databox">
        <h4>
          Total Sales
        </h4>
      <div>
        <div className="databox-content">
          {currencies.map((currency: any, index: any) => (
            <p
              className="chart-currency"
              key={currency}
            >
              <span
                style={{ backgroundColor: randomColors[index] }}
                className="chart-dot"
              ></span>
              {currency}
            </p>
          ))}
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
              radius={[2, 2, 2, 2]}
            />
          ))}
          {/* <Bar
            dataKey="eth"
            stackId="a"
            fill="#8d83fb"
            barSize={5}
            radius={[2, 2, 2, 2]}
            />
          <Bar
            dataKey="btc"
            stackId="a"
            fill="#c3bdff"
            barSize={5}
            radius={[2, 2, 2, 2]}
            />
          <Bar
            dataKey="usdc"
            stackId="a"
            fill="#5545fa"
            barSize={5}
            radius={[2, 2, 2, 2]}
            /> */}
        </BarChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default TotalSales;
