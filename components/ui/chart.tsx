import { FC } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface ChartProps {
  type: "bar" | "doughnut"; // Chart type to determine which chart to render
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[]; // Allow single or multiple colors
    }>;
  };
  options?: any;
}

const Chart: FC<ChartProps> = ({ type, data, options }) => {
  return (
    <>
      {type === "bar" && <Bar data={data} options={options} />}
      {type === "doughnut" && <Doughnut data={data} options={options} />}
    </>
  );
};

export default Chart;
