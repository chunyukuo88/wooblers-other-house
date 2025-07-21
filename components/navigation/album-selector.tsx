import {convertFolderNameToDate} from "@/components/navigation/utils";
import {ChangeEvent} from "react";
import {useMainImages} from "../../store";
import "./album-selector.css";

export const AlbumSelector = (props: any) => {
  const { style } = props;
  const {fetchedFolders, updateCurrentFolder} = useMainImages();

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const index  = event.target.selectedIndex - 1;
    if (index >= 0) {
      const folder = fetchedFolders[index];
      updateCurrentFolder(folder);
    }
  };

  return (
    <select name="album-picked" id="woh__album-picker" onChange={changeHandler} style={style}>
      <option value="">Pick album</option>
      {fetchedFolders.map((folder, index) => {
        return (
          <option className="woh__album-picker__option" key={index} value={folder.friendlyName}>
            {folder.friendlyName}
          </option>
        );
      })}
    </select>
  );
}
