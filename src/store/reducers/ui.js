import {
  LOAD_FONTS,
  OPEN_SIDE_DRAWER,
  CLOSE_SIDE_DRAWER
} from "../actions/actionTypes";

const initialState = {
  isFontLoaded: false,
  isSideDrawerOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FONTS:
      return {
        ...state,
        isFontLoaded: true
      };

    case OPEN_SIDE_DRAWER:
      return {
        ...state,
        isSideDrawerOpen: true
      };

    case CLOSE_SIDE_DRAWER:
      return {
        ...state,
        isSideDrawerOpen: false
      };

    default:
      return state;
  }
};
