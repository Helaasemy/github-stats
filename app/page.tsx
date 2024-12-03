import { signInAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { FaGithub } from 'react-icons/fa';

export default async function Login(props: { searchParams: Promise<Message> }) {
	const searchParams = await props.searchParams;
	return (
		<div className="self-center justify-center items-center min-h-screen">
			<form className="flex-1 flex flex-col min-w-64 max-w-md p-6 bg-white shadow-lg rounded-lg">
				<h1 className="text-2xl font-medium text-center">Sign in</h1>

				<div className="flex flex-col gap-2 mt-8">
					<FaGithub className="text-xl self-center mb-8" />
					<SubmitButton pendingText="Signing In..." formAction={signInAction}>
						Sign in with GitHub
					</SubmitButton>
					<FormMessage message={searchParams} />
				</div>
			</form>
		</div>
	);
}
