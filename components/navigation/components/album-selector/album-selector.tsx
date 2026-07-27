'use client';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { useMainImages } from 'store';
import { Folder } from 'store/fetched-images/types';
import { convertFriendlyToQueryParam } from '../../../../store/utils';
import { AlbumsProps } from './types';
import { updateUrl } from './utils';
import './album-selector.css';

export const AlbumSelector = (props: any) => {
  const { style } = props;
  const { fetchedFolders, currentFolder, updateCurrentFolder } = useMainImages();

  const [folders, setFolders] = useState<Folder[]>([]);

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
    if (currentFolder?.name) {
      const { friendlyName } = currentFolder;
      const asQueryParams = convertFriendlyToQueryParam(friendlyName);
      updateUrl(asQueryParams);
    }
  }, [currentFolder]);

  return (
    <>
      <select
        name="album-picked"
        id="woh__album-picker"
        onChange={changeHandler}
        style={style}
        value={currentFolder.friendlyName}
      >
        {!folders?.length ? <AlbumsLoading /> : <Albums folders={folders} />}
      </select>
    </>
  );
};

function Albums(props: AlbumsProps): ReactNode {
  const { folders } = props;
  return (
    <>
      {folders.map((folder, index) => {
        return (
          <option className="woh__album-picker__option" key={index} value={folder.friendlyName}>
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
