import { ReactNode } from 'react';

export type NavLinkProps = {
  href: string;
  children: ReactNode;
};
export type NavBarProps = {
  fontColor: string;
};
export type HomeLinkProps = {
  pathname: string;
  style: {
    color: string;
    transition: string;
    fontSize: string;
    textShadow: string | undefined;
    fontWeight: number;
  };
};
export type TechLinkProps = {
  pathname: string;
};
export type ColorsLinkProps = {
  pathname: string;
};
