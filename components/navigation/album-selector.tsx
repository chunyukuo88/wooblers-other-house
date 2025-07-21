"use client";
// import {convertFolderNameToDate} from "@/components/navigation/utils";
import {ChangeEvent} from "react";
import {useMainImages} from "../../store";
import {Folder} from "../../store/types";
import "./album-selector.css";

export const AlbumSelector = (props: any) => {
  const { style } = props;
  const {fetchedFolders, isSuccess, updateCurrentFolder} = useMainImages();

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const index  = event.target.selectedIndex - 1;
    if (index >= 0) {
      const folder = fetchedFolders[index];
      updateCurrentFolder(folder);
    }
  };

  return (
    <select name="album-picked" id="woh__album-picker" onChange={changeHandler} style={style}>
        {!fetchedFolders || !isSuccess
          ? <AlbumsLoading style={style}/>
          : null
        }
        {fetchedFolders
          ? <Albums fetchedFolders={fetchedFolders}/>
          : null
        }
    </select>
  );
}

type AlbumsProps = {
  fetchedFolders: Folder[];
}

function Albums(props: AlbumsProps){
  const {fetchedFolders} = props;
  return (
    <>
      <option value="">Pick album</option>
      {fetchedFolders.map((folder, index) => {
        return (
          <option className="woh__album-picker__option" key={index} value={folder.friendlyName}>
            {folder.friendlyName}
          </option>
        );
      })}
    </>
  );
}

function AlbumsLoading(style: any) {
  return (
    <select name="album-picked" id="woh__album-picker" style={style}>
      <option value="">Loading albums...</option>
    </select>
  );
}