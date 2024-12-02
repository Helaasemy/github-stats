'use client'
import React from "react";
import Chart from "./ui/chart";

// Dynamically load the Chart component to avoid SSR issues

const Stats = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
  };

  return (
    <div>
      <h1>Next.js Chart Example</h1>
      <Chart data={data} options={options} />
    </div>
  );
};

export default Stats;
