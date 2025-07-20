import {Folder} from "../../store/types";

export function convertFolderNameToDate(folder: Folder): string{
  const date = new Date(parseInt(folder.name));
  console.log('date: ', date);
  const formatted = new Date(date).toLocaleDateString('en-US');
  return formatted;
}