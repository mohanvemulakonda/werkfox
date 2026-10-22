import Link from 'next/link';
import { SIGNUP_URL, TEAM_EMAIL } from '../_site/data';

/** Thin top bar of the older marketing pages. */
export default function AnnouncementBar() {
  return (
    <div className="announce-bar fixed top-0 left-0 right-0 z-[60] py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px]">
        <Link href={SIGNUP_URL} className="announce-link">Try Pro free for 7 days, no card needed</Link>
        <a href={`mailto:${TEAM_EMAIL}`} className="announce-link">{TEAM_EMAIL}</a>
      </div>
    </div>
  );
}
