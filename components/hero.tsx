import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
	return (
		<div className="flex flex-col gap-8 items-center ">

			<p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
				Welcome to Github Dashboard
			</p>
			<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" />
      <div className="flex gap-8 justify-center items-center">
				<Button asChild size="sm" variant={'outline'}>
					<Link href="/sign-in">Sign in</Link>
				</Button>
				<div>
					<p>or</p>
				</div>
				<Button asChild size="sm" variant={'default'}>
					<Link href="/sign-up">Sign up</Link>
				</Button>
			</div>
		</div>
	);
}
