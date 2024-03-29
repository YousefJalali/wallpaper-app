import { FileSystem, MediaLibrary, Permissions } from "expo";
import {
  startLoading,
  stopLoading,
  downloadCompletedVisible,
  downloadCompletedInvisible
} from "./ui";

export const downloadWallpaper = (id, url) => async dispatch => {
  // check if the app has already been granted access to camera roll
  const getPermission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  if (getPermission.status === "granted") {
    dispatch(saveToLibrary(id, url));
  } else {
    // ask for permission to camera roll
    const askForPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (askForPermission.status === "granted") {
      dispatch(saveToLibrary(id, url));
    } else {
      alert("Camera roll permission not granted");
    }
  }
};

const saveToLibrary = (id, url) => dispatch => {
  dispatch(startLoading());
  FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + `skullwallapaper${id}.jpg`
  )
    .then(({ uri }) => {
      MediaLibrary.createAssetAsync(uri)
        .then(() => {
          dispatch(stopLoading());
          dispatch(downloadCompletedVisible());
          setTimeout(() => dispatch(downloadCompletedInvisible()), 1000);
        //   alert("saved");
        })
        .catch(err => alert(err));
    })
    .catch(error => alert(error));
};
