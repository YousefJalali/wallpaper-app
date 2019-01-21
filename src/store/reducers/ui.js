import { LOAD_FONTS } from "../actions/actionTypes";

const initialState = {
  isFontLoaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FONTS:
      return {
        ...state,
        isFontLoaded: true
      };

    default:
      return state;
  }
};
