import { LOAD_FONTS, LOAD_WALLPAPERS } from "../actions/actionTypes";

const initialState = {
  isFontLoaded: false,
  wallpapers: []
};

const wallpapers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FONTS:
      return {
        ...state,
        isFontLoaded: true
      };

    case LOAD_WALLPAPERS:
      return {
        ...state,
        wallpapers: action.wallpapers
      };

    default:
      return state;
  }
};

export default wallpapers;
