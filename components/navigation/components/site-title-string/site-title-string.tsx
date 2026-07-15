import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { allPaths } from '../../../../allPaths';
import '../../styles/site-title-string.css';
import { HomeLinkProps, SiteTitleStringProps } from './types';
import { Wooblers } from '.';

export function SiteTitleString(props: SiteTitleStringProps) {
  const { fontColor } = props;
  const pathname = usePathname();
  const shadowColor = !fontColor ? 'gray' : 'black';

  const textShadow =
    fontColor !== 'black'
      ? `-1px -1px 0 ${shadowColor}, ` +
        `1px -1px 0 ${shadowColor}, ` +
        `-1px 1px 0 ${shadowColor}, ` +
        `1px 1px 0 ${shadowColor}`
      : undefined;

  const style = {
    color: fontColor,
    transition: '2s ease-in',
    textShadow,
  };

  return (
    <h1 className="woh__site-title-string" style={style}>
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
