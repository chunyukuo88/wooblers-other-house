import {convertFolderNameToDate} from "@/components/navigation/utils";
import React, {useState} from "react";
import {useMainImages} from "../../store";

export const AlbumSelector = () => {
  const {fetchedFolders, updateCurrentFolder} = useMainImages();

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index  = event.target.selectedIndex - 1;
    if (index >= 0) {
      const folder = fetchedFolders[index];
      console.log("clickHandler", folder.name);
      updateCurrentFolder(folder);
    }
  };

  return (
    <select name="album-picked" id="woh__album-picker" onChange={changeHandler}>
      <option value="">Past albums</option>
      {fetchedFolders.map((folder, index) => {
        return (
          <option key={index} value="">
            {convertFolderNameToDate(folder)}
          </option>
        );
      })}
    </select>
  );
}
