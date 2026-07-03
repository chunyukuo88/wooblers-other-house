import { NavLinkProps } from '@/components/navigation/components/nav-bar/types';
import { useState } from 'react';
import Link from 'next/link';

export function NavLink({ href, children }: NavLinkProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    if (!isHovering) {
      setIsHovering(true);
      fetch(href).catch((error) => console.error('Prefetching failed:', error));
    }
  };

  return (
    <Link href={href} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
}
