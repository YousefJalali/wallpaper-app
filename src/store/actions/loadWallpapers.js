import axios from "axios";
import { LOAD_WALLPAPERS } from "./actionTypes";

export const fetchWallpapers = () => {
  return dispatch => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then(res => {
        const data = res.data.slice(0, 10);
        return dispatch(loadWallpapers(data));
      })
      .catch(err => alert(err));
  };
};

export const loadWallpapers = wallpapers => {
  return {
    type: LOAD_WALLPAPERS,
    wallpapers
  };
};
