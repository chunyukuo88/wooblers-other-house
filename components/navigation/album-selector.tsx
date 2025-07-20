import {convertFolderNameToDate} from "@/components/navigation/utils";
import {Folder} from "../../store/types";
import React, {useState} from "react";
import {useMainImages} from "../../store";

export const AlbumSelector = () => {
  const {currentFolder, fetchedFolders, updateCurrentFolder} = useMainImages();

  const updateCurrentAlbum()

  return (
    <select name="album-picked" id="woh__album-picker">
      <option value="">Past albums</option>
      {fetchedFolders.map((folder, index) => {
        return (
          <option key={index} value="howzit">{convertFolderNameToDate(folder)}</option>
        );
      })}
    </select>
  );
}
