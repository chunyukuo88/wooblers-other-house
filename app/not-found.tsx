import { ReactNode } from 'react';
import Link from 'next/link';
import { GoHome } from '@/components/navigation';
import './page.css';

export default function NotFound(): ReactNode {
  return (
    <div id="woh__page-not-found">
      <h1 className="pointer-events-none">Oh nose! 👃</h1>
      <p>That page does not exist.</p>
      <Link href="/">
        <GoHome />
      </Link>
    </div>
  );
}
