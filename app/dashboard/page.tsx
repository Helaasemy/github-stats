import Stats from '@/components/stats';
import { Summary } from '@/components/summary/summary';
import { Repos } from '@/components/ui/repos';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
	const supabase = await createClient();

	// Get the authenticated user
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return redirect('/sign-in');
	}

	const githubToken = session?.provider_token;

	const userResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${githubToken}`,
		},
	});

	if (!userResponse.ok) {
		return <div>Error fetching GitHub user details</div>;
	}

	const user = await userResponse.json();

	const response = await fetch('https://api.github.com/user/repos', {
		headers: {
			Authorization: `Bearer ${githubToken}`,
		},
	});

	if (!response.ok) {
	}
	const repositories = await response.json();

	const statsData = [
		{ title: 'Followers', stats: user.followers },
		{ title: 'Following', stats: user.following },
		{ title: 'Public Repositories', stats: user.public_repos },
		{
			title: 'Private Repositories',
			stats: repositories.filter((repo: any) => repo.private).length,
		},
	];

	return (
		<div className="flex-1 w-full flex flex-col gap-12">
			<h1 className="tds-headline-01">My GitHub Summary</h1>
			<div className="w-full">
				<Summary statsData={statsData} />
			</div>
			<div className="w-full">
				<h2 className="text-lg font-bold tds-u-mb2">Repositories:</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{repositories.map((repo: any) => (
						<Repos
							key={repo.id}
							title={repo.name}
							type={repo.private}
							repoId={repo.id}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-2 items-start">
				{/* <Stats /> */}

				<div></div>

				{/* <div>
					<pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
						{JSON.stringify(session?.user, null, 2)}
					</pre>
				</div> */}
			</div>
		</div>
	);
}
