'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMainImages } from '../../../store';
import { Folder } from 'store/fetched-images/types';
import '../styles/album-selector.css';

export const AlbumSelector = (props: any) => {
  const { style } = props;
  const { fetchedFolders, updateCurrentFolder } = useMainImages();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [current, setCurrent] = useState<string>('');

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

  return (
    <select name="album-picked" id="woh__album-picker" onChange={changeHandler} style={style}>
      {!folders?.length ? <AlbumsLoading /> : <Albums folders={folders} />}
    </select>
  );
};

type AlbumsProps = {
  folders: Folder[];
};

function Albums(props: AlbumsProps) {
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

function AlbumsLoading() {
  return (
    <option className="woh__album-picker__option" value="">
      Loading...
    </option>
  );
}
