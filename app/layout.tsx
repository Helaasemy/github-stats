import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import { Nav } from '@/components/ui/nav';
import Link from 'next/link';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'My GitHub Summary ',
	description: 'The faster way to get Github Stats',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={GeistSans.className} suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="min-h-screen flex">
						<div className="flex-1 w-full flex flex-col gap-16 ">
							<Nav />
							<div className="flex flex-col p-5">
								{children}
							</div>
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
