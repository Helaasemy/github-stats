import React from "react";
import { StatsCard } from "../ui/stats-card";

interface StatData {
  title: string;
  stats: number;
}

interface SummaryProps {
  statsData: StatData[];
}

const Summary: React.FC<SummaryProps> = ({ statsData }) => {
  return (
    <>
      <div className="tds-headline-04 tds-u-mb2">Summary:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} title={stat.title} stats={stat.stats} />
        ))}
      </div>
    </>
  );
};

export { Summary };
