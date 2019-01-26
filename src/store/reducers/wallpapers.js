import {
  LOAD_WALLPAPERS,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE
} from "../actions/actionTypes";

const initialState = {
  wallpapers: [],
  favorite: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_WALLPAPERS:
      return {
        ...state,
        wallpapers: action.wallpapers
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
