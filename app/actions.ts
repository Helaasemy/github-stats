'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signInAction = async () => {
	const origin = (await headers()).get('origin');
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	});

	if (data.url) {
		redirect(data.url);
	}
	if (error) {
		return encodedRedirect('error', '/sign-in', error.message);
	}

	return redirect('/protected');
};

export const signOutAction = async () => {
	const supabase = await createClient();
	await supabase.auth.signOut();
	return redirect('/sign-in');
};
