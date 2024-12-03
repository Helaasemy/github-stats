'use client'; // Ensures the component runs on the client-side

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Chart from '@/components/ui/chart';

export default function RepositoryDetails() {
	const { repoId } = useParams();
	const [repoDetails, setRepoDetails] = useState<any>(null);
	const [repoLanguages, setRepoLanguages] = useState<Record<
		string,
		number
	> | null>(null);
	const [monthlyCommitActivity, setMonthlyCommitActivity] = useState<Record<
		string,
		number
	> | null>(null);
	const [loading, setLoading] = useState(true);
	const supabase = createClient();

	useEffect(() => {
		const fetchRepoData = async () => {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();

				if (!session?.provider_token) {
					throw new Error('GitHub token not found.');
				}

				const githubToken = session.provider_token;

				// Fetch repository details
				const repoResponse = await fetch(
					`https://api.github.com/repositories/${repoId}`,
					{
						headers: {
							Authorization: `Bearer ${githubToken}`,
						},
					}
				);

				if (!repoResponse.ok) {
					throw new Error(
						`Error fetching repository details: ${repoResponse.status}`
					);
				}

				const repoData = await repoResponse.json();
				setRepoDetails(repoData);

				// Fetch repository languages
				const languagesResponse = await fetch(
					`https://api.github.com/repos/${repoData.owner.login}/${repoData.name}/languages`,
					{
						headers: {
							Authorization: `Bearer ${githubToken}`,
						},
					}
				);

				if (!languagesResponse.ok) {
					throw new Error(
						`Error fetching repository languages: ${languagesResponse.status}`
					);
				}

				const languagesData = await languagesResponse.json();
				setRepoLanguages(languagesData);

				// Fetch commit activity
				const commitActivityResponse = await fetch(
					`https://api.github.com/repos/${repoData.owner.login}/${repoData.name}/stats/commit_activity`,
					{
						headers: {
							Authorization: `Bearer ${githubToken}`,
						},
					}
				);

				if (!commitActivityResponse.ok) {
					throw new Error(
						`Error fetching commit activity: ${commitActivityResponse.status}`
					);
				}

				const commitActivityData = await commitActivityResponse.json();

				if (
					!Array.isArray(commitActivityData) ||
					commitActivityData.length === 0
				) {
					console.warn('Commit activity data is not available or empty');
					setMonthlyCommitActivity({});
					return;
				}

				// Process weekly data into monthly data
				const monthlyActivity: Record<string, number> = {};
				commitActivityData.forEach((week: any) => {
					const date = new Date(week.week * 1000); // Convert Unix timestamp to date
					const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
					monthlyActivity[month] = (monthlyActivity[month] || 0) + week.total;
				});

				setMonthlyCommitActivity(monthlyActivity);
			} catch (error) {
				console.error('Error:', error);
				setRepoDetails(null);
				setRepoLanguages(null);
				setMonthlyCommitActivity(null);
			} finally {
				setLoading(false);
			}
		};

		if (repoId) {
			fetchRepoData();
		}
	}, [repoId, supabase]);

	if (loading) return <p>Loading...</p>;
	if (!repoDetails || !repoLanguages || !monthlyCommitActivity)
		return <p>Failed to fetch repository data.</p>;

	const monthlyLabels = Object.keys(monthlyCommitActivity); // Months as labels
	const monthlyData = Object.values(monthlyCommitActivity); // Total commits per month

	return (
		<div className="flex-1 w-full flex flex-col gap-12">
			<h1 className="tds-headline-01">{repoDetails.name}</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
				<div className="md:col-span-2 p-4 border rounded-lg shadow">
					<Chart
						type="bar"
						data={{
							labels: monthlyLabels, // Months (e.g., "Jan", "Feb", etc.)
							datasets: [
								{
									label: 'Commits',
									data: monthlyData, // Commit counts
									backgroundColor: monthlyData.map(
										(value) =>
											value === Math.max(...monthlyData) ? '#2b70d3' : '#bacde8' // Darker blue for the max, lighter for others
									),
								},
							],
						}}
						options={{
							indexAxis: 'y', // Makes the bar chart horizontal
							responsive: true,
							plugins: {
								legend: { display: false }, // Remove the legend for simplicity
								title: { display: true, text: 'Monthly Commit Activity' }, // Add chart title
							},
							scales: {
								x: {
									beginAtZero: true,
									title: {
										display: true,
										text: 'Commits', // Label for the X-axis
									},
									grid: { display: false },
								},
								y: {
									title: {
										display: true,
										text: 'Months', // Label for the Y-axis
									},
									grid: { display: false },
								},
							},
						}}
					/>
				</div>
				<div className="md:col-span-1 p-4 border rounded-lg shadow max-w-sm">
					<Chart
						type="doughnut"
						data={{
							labels: Object.keys(repoLanguages),
							datasets: [
								{
									label: 'Languages',
									data: Object.values(repoLanguages),
									backgroundColor: [
										'#2058a8',
										'#bacde8',
										'#2058a8',
										'#87afe8',
										'#4a89f3',
										'#2b70d3',
									],
								},
							],
						}}
						options={{
							responsive: true,
							plugins: {
								legend: { position: 'bottom' },
								title: { display: true, text: 'Languages Usage' },
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
}
