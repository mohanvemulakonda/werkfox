import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

/**
 * /dashboard is a signpost, not a page.
 *
 * It used Clerk's useAuth in the browser to decide where to send people, which meant shipping a
 * client bundle and a redirect flash to answer a question the server already knows. It now asks
 * the session directly and redirects before anything renders.
 */
export default async function DashboardPage() {
  const session = await auth();
  redirect(session ? '/admin' : '/login');
}
