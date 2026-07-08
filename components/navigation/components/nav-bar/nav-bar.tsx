'use client';
import Link from 'next/link';
import { allPaths } from '../../../../allPaths';
import { usePathname } from 'next/navigation';
import { AlbumSelector } from '@/components/navigation/components/album-selector/album-selector';
import {
  ColorsLinkProps,
  HomeLinkProps,
  NavBarProps,
  TechLinkProps,
} from '@/components/navigation/components/nav-bar/types';
import { NavLink } from '@/components/navigation/components/nav-bar/nav-link';
import { getStyle } from '@/components/navigation/components/nav-bar/utils';
import '../../styles/nav-bar.css';

export default function NavBar({ fontColor }: NavBarProps) {
  const pathname = usePathname();
  const style = getStyle(fontColor);

  return (
    <div id="woh__nav-bar" style={style}>
      <ColorsLink pathname={pathname} />
      <TechLink pathname={pathname} />
      <Albums pathname={pathname} style={style} />
    </div>
  );
}

const Albums = (props: HomeLinkProps) => {
  const { pathname, style } = props;
  return (
    <div className="woh__nav-bar-string">
      {pathname === allPaths.HOME ? (
        <AlbumSelector style={style} />
      ) : (
        <div className="woh_album-picker-placeholder"></div>
      )}
    </div>
  );
};

const TechLink = (props: TechLinkProps) => {
  const { pathname } = props;
  return (
    <div className="woh__nav-bar-string">
      {pathname === allPaths.TECH ? (
        <Link href={allPaths.HOME}>Home</Link>
      ) : (
        <NavLink href={allPaths.TECH}>Tech</NavLink>
      )}
    </div>
  );
};

const ColorsLink = (props: ColorsLinkProps) => {
  const { pathname } = props;
  return (
    <div className="woh__nav-bar-string">
      {pathname === allPaths.COLORS ? (
        <Link href={allPaths.HOME}>Home</Link>
      ) : (
        <NavLink href={allPaths.COLORS}>Colors</NavLink>
      )}
    </div>
  );
};
