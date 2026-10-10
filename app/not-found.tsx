import { ReactNode } from 'react';
import Link from 'next/link';
import { GoHome } from '@/components/navigation';

export default function NotFound(): ReactNode {
  return (
    <div>
      <h1 className="pointer-events-none">Oh nose! 👃</h1>
      <p className="pointer-events-none">That page does not exist.</p>
      <Link href="/">
        <GoHome />
      </Link>
    </div>
  );
}
