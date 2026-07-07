'use client';

import { createContext, type PropsWithChildren, useReducer, useContext, ReactElement } from 'react';
import { albumFriendlyReducer, albumUrlReducer, initialFriendly, initialUrl } from './reducer';
import { setCurrentFriendly, setCurrentAlbumUrl } from './actions';

type AlbumsContextType = {
  currentAlbumFriendly: string;
  currentAlbumUrl: string;
  updateAlbumFriendly: (newAlbum: string) => void;
  updateAlbumUrl: (newAlbumUrl: string) => void;
};

export const AlbumContext = createContext<AlbumsContextType>({
  currentAlbumFriendly: initialFriendly,
  currentAlbumUrl: initialUrl,
  updateAlbumFriendly: (newFriendly: string) => {},
  updateAlbumUrl: (newUrl: string) => {},
});

export function AlbumProvider(props: PropsWithChildren): ReactElement {
  const [currentFriendly, dispatchFriendly] = useReducer(albumFriendlyReducer, initialUrl);
  const [currentUrl, dispatchUrl] = useReducer(albumUrlReducer, initialFriendly);

  const contextValue: AlbumsContextType = {
    currentAlbumFriendly: currentFriendly,
    currentAlbumUrl: currentUrl,
    updateAlbumFriendly: (newFriendly: string): void => {
      dispatchFriendly(setCurrentFriendly(newFriendly));
    },
    updateAlbumUrl: (newUrl: string): void => {
      dispatchUrl(setCurrentAlbumUrl(newUrl));
    },
  };

  return <AlbumContext.Provider value={contextValue}>{props.children}</AlbumContext.Provider>;
}

export function useAlbum(): AlbumsContextType {
  return useContext(AlbumContext);
}
