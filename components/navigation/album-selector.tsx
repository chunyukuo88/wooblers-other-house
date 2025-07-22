"use client";
import {ChangeEvent} from "react";
import {useMainImages} from "../../store";
import {Folder} from "../../store/types";
import "./album-selector.css";

export const AlbumSelector = (props: any) => {
  const { style } = props;
  const {fetchedFolders, updateCurrentFolder} = useMainImages();

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const index  = event.target.selectedIndex;
    const folder = fetchedFolders[index];
    updateCurrentFolder(folder);
  };

  return (
    <label htmlFor="woh__album-picker">Album:
      <select name="album-picked" id="woh__album-picker" onChange={changeHandler} style={style}>
        {!fetchedFolders?.length ? <AlbumsLoading /> : <Albums fetchedFolders={fetchedFolders} />}
      </select>
    </label>
  );
}

type AlbumsProps = {
  fetchedFolders: Folder[];
}

function Albums(props: AlbumsProps){
  const {fetchedFolders} = props;
  return (
    <>
      {fetchedFolders.map((folder, index) => {
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
  return (<option className="woh__album-picker__option" value="">Loading...</option>);
}