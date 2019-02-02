import axios from "axios";
import { LOAD_WALLPAPERS } from "./actionTypes";

export const fetchWallpapers = () => {
  return dispatch => {
    axios
      .get("https://skull-background.firebaseio.com/wallpapers.json")
      .then(res => {
        const data = res.data;
        let wallpapers = [];
        for (let obj in data) {
          wallpapers.push(data[obj]);
        }
        return dispatch(loadWallpapers(wallpapers));
      })
      .catch(() => alert("Failed to fetch wallpapers. Try again."));
  };
};

export const loadWallpapers = wallpapers => {
  return {
    type: LOAD_WALLPAPERS,
    wallpapers
  };
};
