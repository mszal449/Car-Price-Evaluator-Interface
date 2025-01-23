"use client"; // Ensures this is a Client Component

import React, { useEffect, useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type SemiCircularProgressBarProps = {
  value: number;
  maxValue: number;
};

const calculateColor = (percentage: number) => {
    // Adjust the transition points for red and green
    // Start red sooner at 10% and stop fading it at 30%
    const red = percentage < 10 ? 255 : Math.max(255 - (percentage - 10) * 8.5, 0); // Start fading red at 10% and stop at 30%
    
    // Start green earlier at 10% and stop fully green at 70%
    const green = percentage > 10 ? Math.min((percentage - 10) * 3.64, 255) : 0; // Start fading in green at 10%
    
    return `rgb(${red}, ${green}, 0)`; // RGB color format
};

const SemiCircularProgressBar: React.FC<SemiCircularProgressBarProps> = ({ value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  const color = calculateColor(percentage);

  return (
    <div className="w-[400px] h-[200px] relative overflow-hidden">
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          rotation: 0.75, // Start from bottom-left
          strokeLinecap: "round",
          trailColor: "#ddd",
          pathColor: color, // Progress bar color
        })}
      >
        <div className="absolute top-[164px] left-1/2 transform -translate-x-1/2 text-4xl font-bold">
          {value.toLocaleString() + "PLN"}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

const ResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<{
    estimated_price: number;
    expected_price_1y: number;
    expected_price_2y: number;
    expected_price_3y: number;
    expected_price_4y: number;
  } | null>(null);

  useEffect(() => {
    // Extract query parameters from the URL
    const params = new URLSearchParams(window.location.search);

    const estimated_price = parseFloat(params.get("estimated_price") || "0");
    const expected_price_1y = parseFloat(params.get("expected_price_1y") || "0");
    const expected_price_2y = parseFloat(params.get("expected_price_2y") || "0");
    const expected_price_3y = parseFloat(params.get("expected_price_3y") || "0");
    const expected_price_4y = parseFloat(params.get("expected_price_4y") || "0");

    setSearchParams({
      estimated_price,
      expected_price_1y,
      expected_price_2y,
      expected_price_3y,
      expected_price_4y,
    });
  }, []);

  if (!searchParams) {
    return <div>Loading...</div>;
  }

  const { estimated_price, expected_price_1y, expected_price_2y, expected_price_3y, expected_price_4y } =
    searchParams;

  const data = {
    labels: ['Now', '1 Year', '2 Years', '3 Years', '4 Years'],
    datasets: [
      {
        label: 'Price (PLN)',
        data: [estimated_price, expected_price_1y, expected_price_2y, expected_price_3y, expected_price_4y],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Estimated Price Over Time',
      },
    },
  };

  return (
    <div className="flex flex-col items-center pt-40 h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-center font-bold pb-10">We have got your results!</h1>
        <SemiCircularProgressBar value={estimated_price} maxValue={250000} />
        <div className="w-full max-w-2xl mt-10">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
