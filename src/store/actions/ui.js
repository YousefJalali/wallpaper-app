import {
  START_LOADING,
  STOP_LOADING,
  DOWNLOAD_COMPLETED_VISIBLE,
  DOWNLOAD_COMPLETED_INVISIBLE
} from "./actionTypes";

export const startLoading = () => ({
  type: START_LOADING
});
export const stopLoading = () => ({
  type: STOP_LOADING
});

export const downloadCompletedVisible = () => ({
  type: DOWNLOAD_COMPLETED_VISIBLE
});
export const downloadCompletedInvisible = () => ({
  type: DOWNLOAD_COMPLETED_INVISIBLE
});
