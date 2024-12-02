import React from "react";
import { StatsCard } from "../ui/stats-card";

const Summary = () => {
  const statsData = [
    { title: "Users", stats: 1200 },
    { title: "Projects", stats: 75 },
    { title: "Tasks Completed", stats: 3400 },
    { title: "Teams", stats: 15 },
  ];
	return (
    <>
    <div className="tds-headline-04 tds-u-mb2">
      Summarry
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <StatsCard key={index} title={stat.title} stats={stat.stats} />
      ))}
    </div>
    </>
	);
};

export { Summary };