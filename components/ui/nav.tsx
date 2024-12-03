'use client';

import { useEffect, useState } from 'react';
import {
	defineCustomElements,
	TdsHeader,
	TdsHeaderBrandSymbol,
	TdsHeaderHamburger,
	TdsHeaderTitle,
} from '@scania/tegel-react';
import { Button } from './button';
import { signOutAction } from '@/app/actions';
import { createClient } from '@/utils/supabase/client';
import clsx from 'clsx';

const Nav = () => {
	const [session, setSession] = useState<any>(null);
	const supabase = createClient();

	useEffect(() => {
		const fetchSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
		};
		fetchSession();
	}, [supabase]);

	defineCustomElements();

	return (
		<TdsHeader>
			<TdsHeaderHamburger
				onClick={() => {}}
				aria-label="Open application drawer"
				aria-haspopup="true"
				aria-expanded="false"
			/>
			<TdsHeaderTitle>Github Dashboard</TdsHeaderTitle>

			<Button
				type="submit"
				variant={'outline'}
				onClick={signOutAction}
				className={clsx({
					invisible: !session?.user,
				})}
			>
				Sign out
			</Button>

			<TdsHeaderBrandSymbol slot="end">
				<a aria-label="Scania - red gryphon on blue shield"></a>
			</TdsHeaderBrandSymbol>
		</TdsHeader>
	);
};

export { Nav };
