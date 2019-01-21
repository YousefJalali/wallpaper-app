import {
  LOAD_WALLPAPERS,
  OPEN_DETAILS,
  CLOSE_DETAILS
} from "../actions/actionTypes";

const initialState = {
  wallpapers: [],
  isDetailsVisible: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_WALLPAPERS:
      return {
        ...state,
        wallpapers: action.wallpapers
      };

    case OPEN_DETAILS:
      return {
        ...state,
        isDetailsVisible: true
      };

    case CLOSE_DETAILS:
      return {
        ...state,
        isDetailsVisible: false
      };

    default:
      return state;
  }
};
