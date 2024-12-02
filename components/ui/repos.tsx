import clsx from 'clsx';

interface StatsCardProps {
	title: string;
	type: boolean;
}

const Repos = ({ title, type }: StatsCardProps) => {
	return (
		<div
			className={clsx(
				'tds-u-m4 rounded-md tds-u-flex tds-u-justify-between cursor-pointer',
				{
					'tds-background-green-100 hover:tds-background-blue-50': type,
					'tds-background-red-100 hover:tds-background-blue-50': !type,
				}
			)}
		>
			<p className="tds-headline-06 tds-u-m1 whitespace-nowrap">{title}</p>
			<h1 className="tds-headline-06 tds-u-m1">{type ? 'Privet' : 'Public'}</h1>
		</div>
	);
};

export { Repos };
