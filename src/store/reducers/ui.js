import {
  START_LOADING,
  STOP_LOADING,
  DOWNLOAD_COMPLETED_VISIBLE,
  DOWNLOAD_COMPLETED_INVISIBLE
} from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isDownloadCompletedVisible: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };

    case DOWNLOAD_COMPLETED_VISIBLE:
      return {
        ...state,
        isDownloadCompletedVisible: true
      };

    case DOWNLOAD_COMPLETED_INVISIBLE:
      return {
        ...state,
        isDownloadCompletedVisible: false
      };

    default:
      return state;
  }
};
