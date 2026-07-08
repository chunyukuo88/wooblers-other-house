'use client';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { useAlbum, useMainImages } from 'store';
import { emptyFolder, Folder } from 'store/fetched-images/types';
import { convertFriendlyToQueryParam } from 'store/album/utils';
import { AlbumsProps } from './types';
import { updateUrl } from './utils';
import '../../styles/album-selector.css';

export const AlbumSelector = (props: any) => {
  const { style } = props;
  const { fetchedFolders, currentFolder, updateCurrentFolder } = useMainImages();
  const { updateAlbumFriendly, updateAlbumUrl } = useAlbum();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [current, setCurrent] = useState<Folder>(emptyFolder);

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.selectedIndex;
    const folder = fetchedFolders[index];
    updateCurrentFolder(folder);
  };

  useEffect(() => {
    if (fetchedFolders.length) {
      setFolders(fetchedFolders);
    }
  }, [fetchedFolders]);

  useEffect(() => {
    if (currentFolder) {
      setCurrent(currentFolder);
      const { friendlyName } = currentFolder;
      updateAlbumFriendly(friendlyName);
      const asQueryParams = convertFriendlyToQueryParam(friendlyName);
      updateAlbumUrl(asQueryParams);
      updateUrl(asQueryParams);
    }
  }, [currentFolder]);

  return (
    <select name="album-picked" id="woh__album-picker" onChange={changeHandler} style={style}>
      {!folders?.length ? <AlbumsLoading /> : <Albums folders={folders} current={current} />}
    </select>
  );
};

function Albums(props: AlbumsProps): ReactNode {
  const { folders, current } = props;
  return (
    <>
      {folders.map((folder, index) => {
        return (
          <option
            className="woh__album-picker__option"
            key={index}
            value={folder.friendlyName}
            selected={folder.name === current.name}
          >
            {folder.friendlyName || index}
          </option>
        );
      })}
    </>
  );
}

function AlbumsLoading(): ReactNode {
  return (
    <option className="woh__album-picker__option" value="">
      Loading...
    </option>
  );
}
