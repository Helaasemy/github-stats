interface StatsCardProps {
	title: string;
  stats: number
}

const StatsCard = ({ title, stats }: StatsCardProps) => {
  
	return (
		<div className="tds-background-blue-50 tds-u-m4 rounded-md">
      <p className="tds-u-p1 tds-detail-02">{title}</p>
			<h1 className="tds-headline-01 tds-u-p1 tds-u-pt1 tds-u-pb1 ">{stats}</h1>
    </div>
	);
};

export { StatsCard };