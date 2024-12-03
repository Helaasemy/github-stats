'use client'; // Ensures the component runs on the client-side

import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Chart from '@/components/ui/chart';
import { TdsSpinner, TdsTextField } from '@scania/tegel-react';

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
	const [commits, setCommits] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
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
				// Safeguard against invalid or null data
				if (Array.isArray(commitActivityData)) {
					const monthlyActivity: Record<string, number> = {};

					commitActivityData.forEach((week) => {
						const date = new Date(week.week * 1000);
						const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
						monthlyActivity[month] = (monthlyActivity[month] || 0) + week.total;
					});

					setMonthlyCommitActivity(monthlyActivity);
				} else {
					console.warn(
						'Commit Activity Data is not an array:',
						commitActivityData
					);
					setMonthlyCommitActivity({});
				}

				// Fetch commits
				const commitsResponse = await fetch(
					`https://api.github.com/repos/${repoData.owner.login}/${repoData.name}/commits`,
					{
						headers: {
							Authorization: `Bearer ${githubToken}`,
						},
					}
				);

				if (!commitsResponse.ok) {
					throw new Error(`Error fetching commits: ${commitsResponse.status}`);
				}

				const commitsData = await commitsResponse.json();
				setCommits(commitsData);
			} catch (error) {
				console.error('Error:', error);
				setRepoDetails(null);
				setRepoLanguages(null);
				setMonthlyCommitActivity(null);
				setCommits([]);
			} finally {
				setLoading(false);
			}
		};

		if (repoId) {
			fetchRepoData();
		}
	}, [repoId, supabase]);

	if (loading) return <TdsSpinner variant="standard"></TdsSpinner>;
	if (!repoDetails || !repoLanguages || !monthlyCommitActivity)
		return <p>Failed to fetch repository data.</p>;

	const monthlyLabels = Object.keys(monthlyCommitActivity);
	const monthlyData = Object.values(monthlyCommitActivity);
	const filteredCommits = commits.filter(
		(commit) =>
			commit.commit.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
			commit.author?.login?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="flex-1 w-full flex flex-col gap-12">
			<h1 className="tds-headline-01">{repoDetails.name}</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
				<div className="md:col-span-2 p-4 border rounded-lg shadow">
					{monthlyCommitActivity && (
						<Chart
							type="bar"
							data={{
								labels: monthlyLabels,
								datasets: [
									{
										label: 'Commits',
										data: monthlyData,
										backgroundColor: monthlyData.map((value) =>
											value === Math.max(...monthlyData) ? '#2b70d3' : '#bacde8'
										),
									},
								],
							}}
							options={{
								indexAxis: 'y',
								responsive: true,
								plugins: {
									legend: { display: false },
									title: { display: true, text: 'Monthly Commit Activity' },
								},
								scales: {
									x: {
										beginAtZero: true,
										title: { display: true, text: 'Commits' },
										grid: { display: false },
									},
									y: {
										title: { display: true, text: 'Months' },
										grid: { display: false },
									},
								},
							}}
						/>
					)}
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
			<div className="p-4 border rounded-lg shadow">
				<h2 className="text-lg font-semibold mb-4">Recent Commits</h2>
				<div className="mb-4 max-w-sm ">
					<TdsTextField
						label="Search Commits"
						placeholder="Type to search..."
						value={searchTerm}
						onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
					/>
				</div>
				<div className="space-y-6 max-h-80 overflow-y-auto">
					{filteredCommits.length > 0 ? (
						filteredCommits.map((commit) => (
							<a
								key={commit.sha}
								href={commit.html_url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex gap-4 items-center group"
							>
								<img
									src={commit.author?.avatar_url || '/default-avatar.png'}
									alt={commit.author?.login || commit.commit?.author.name}
									className="w-10 h-10 rounded-full object-cover"
								/>
								<div className="flex-1">
									<p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
										{commit.commit.message}
									</p>
									<p className="text-sm text-gray-500">
										{commit.author?.login || commit.commit?.author.name} -{' '}
										{new Date(commit.commit.author.date).toLocaleString()}
									</p>
								</div>
							</a>
						))
					) : (
						<p className="text-sm text-gray-500">
							No commits match your search.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
