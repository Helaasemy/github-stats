import clsx from 'clsx';
import Link from 'next/link';

interface StatsCardProps {
	title: string;
	type: boolean;
	repoId: number;
}

const Repos = ({ title, type, repoId }: StatsCardProps) => {
	return (
		<Link
			href={`/repository/${repoId}`}
			className={clsx(
				'tds-u-m4 rounded-md tds-u-flex tds-u-justify-between cursor-pointer tds-u-p4',
				{
					'tds-background-green-100 hover:tds-background-blue-50': type,
					'tds-background-red-100 hover:tds-background-blue-50': !type,
				}
			)}
		>
			<p className="tds-headline-06 tds-u-m1 whitespace-nowrap">{title}</p>
			<h1 className="tds-headline-06 tds-u-m1">
				{type ? 'Private' : 'Public'}
			</h1>
		</Link>
	);
};

export { Repos };
