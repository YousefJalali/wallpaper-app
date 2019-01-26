import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from "./actionTypes";

export const addToFavorite = id => ({
  type: ADD_TO_FAVORITE,
  id
});

export const removeFromFavorite = id => ({
  type: REMOVE_FROM_FAVORITE,
  id
});
