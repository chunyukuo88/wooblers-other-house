import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { allPaths } from '../../../../allPaths';
import { HomeLinkProps, SiteTitleStringProps } from './types';
import { Wooblers } from '.';
import './site-title-string.css';
import { useEffect, useState } from 'react';

export function SiteTitleString(props: SiteTitleStringProps) {
  const { fontColor, gradientStart } = props;
  const pathname = usePathname();
  const [isShrunken, setIsShrunken] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeShrunken = window.scrollY > 50;
      setIsShrunken(shouldBeShrunken);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const shadowColor = !fontColor ? 'gray' : 'black';

  const textShadow =
    fontColor !== 'black'
      ? `-1px -1px 0 ${shadowColor}, ` +
        `1px -1px 0 ${shadowColor}, ` +
        `-1px 1px 0 ${shadowColor}, ` +
        `1px 1px 0 ${shadowColor}`
      : undefined;

  const style = {
    background: `${gradientStart}`,
    color: fontColor,
    transition: '0.25s ease-in',
    textShadow,
  };

  const className = `woh__site-title-string ${isShrunken ? 'woh_site-title-string--shrunken' : ''}`;

  return (
    <h1 className={className} style={style}>
      <div className="woh__wiggling-toys">⚽</div>
      <HomeLink pathname={pathname} />
      <div className="woh__wiggling-toys">🪀</div>
    </h1>
  );
}

const HomeLink = ({ pathname }: HomeLinkProps) => {
  return pathname === allPaths.HOME ? (
    <div>
      <Wooblers />
      <div className="woh_drop-in">Other</div>
      <div className="woh_eventual-slant">House</div>
    </div>
  ) : (
    <Link href={allPaths.HOME}>
      <Wooblers />
      <div className="woh_drop-in">Other</div>
      <div className="woh_eventual-slant">House</div>
    </Link>
  );
};
