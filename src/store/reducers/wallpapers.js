import {
  LOAD_WALLPAPERS,
  OPEN_DETAILS,
  CLOSE_DETAILS,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE
} from "../actions/actionTypes";

const initialState = {
  wallpapers: [],
  favorite: [],
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

    case ADD_TO_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.concat(action.id)
      };

    case REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter(id => id !== action.id)
      };

    default:
      return state;
  }
};
