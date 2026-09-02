import { redirect } from 'next/navigation';

/**
 * Self-serve sign-up went away with Clerk. Accounts are created by an administrator, so this
 * forwards to the login page rather than offering a form that cannot work.
 */
export default function SignUpRedirect() {
  redirect('/login');
}
