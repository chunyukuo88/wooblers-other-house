import Link from 'next/link';
import { allPaths } from '../../../../allPaths';
import { usePathname } from 'next/navigation';
import { AlbumSelector } from '../album-selector/album-selector';
import {
  ColorsLinkProps,
  HomeLinkProps,
  NavBarProps,
  TechLinkProps,
} from '@/components/navigation/components/nav-bar/types';
import { NavLink } from '@/components/navigation/components/nav-bar/nav-link';
import { getStyle } from '@/components/navigation/components/nav-bar/utils';
import { ShareButton } from '../share-button';
import '../../styles/nav-bar.css';

export default function NavBar(props: NavBarProps) {
  const { fontColor } = props;
  const pathname = usePathname();
  const style = getStyle(fontColor);

  return (
    <div id="woh__nav-bar" style={style}>
      <ColorsLink pathname={pathname} />
      <TechLink pathname={pathname} />
      <Albums pathname={pathname} style={style} />
      {pathname === allPaths.HOME ? <ShareButton /> : null}
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
      {pathname === allPaths.LOGIN ? (
        <Link href={allPaths.HOME}>Home</Link>
      ) : (
        <NavLink href={allPaths.LOGIN}>Admin</NavLink>
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
