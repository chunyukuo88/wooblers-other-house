import { Dispatch, SetStateAction } from 'react';

export const getIntersectionObserver = (cb: Dispatch<SetStateAction<boolean>>) => {
  return new IntersectionObserver(([entry]) => {
    cb(entry.isIntersecting);
  });
};
