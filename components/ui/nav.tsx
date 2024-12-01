'use client';

import {
	defineCustomElements,
	TdsHeader,
	TdsHeaderBrandSymbol,
	TdsHeaderHamburger,
	TdsHeaderTitle,
} from '@scania/tegel-react';
import { Button } from './button';
import { signOutAction } from '@/app/actions';

interface NavProps {
	isLogged: boolean;
}

const Nav = ({ isLogged }: NavProps) => {
  
	defineCustomElements();
	return (
		<TdsHeader>
			<TdsHeaderHamburger
				onClick={() => {}}
				aria-label="Open application drawer"
				aria-haspopup="true"
				aria-expanded="false"
			></TdsHeaderHamburger>

			<TdsHeaderTitle>Github Dashboard</TdsHeaderTitle>
			{isLogged && (
				<form action={signOutAction}>
					<Button type="submit" variant={'outline'}>
						Sign out
					</Button>
				</form>
			)}
			<TdsHeaderBrandSymbol slot="end">
				<a aria-label="Scania - red gryphon on blue shield"></a>
			</TdsHeaderBrandSymbol>
		</TdsHeader>
	);
};

export { Nav };
