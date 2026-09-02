import { redirect } from 'next/navigation';

/**
 * Kept as a redirect rather than deleted: /sign-in is in bookmarks, in old emails and in
 * middleware's own redirect list. Removing the route would turn all of those into 404s for the
 * sake of tidiness.
 */
export default function SignInRedirect() {
  redirect('/login');
}
