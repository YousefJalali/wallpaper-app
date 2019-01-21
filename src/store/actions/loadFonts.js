import { LOAD_FONTS } from './actionTypes';
import { Font } from "expo";

export const loadFonts = () => {
  return dispatch => {
    Font.loadAsync({
      "Raleway-bold": require("../../assets/fonts/Raleway-Bold.ttf"),
      "Raleway-black": require("../../assets/fonts/Raleway-Black.ttf"),
      "Raleway-medium": require("../../assets/fonts/Raleway-Medium.ttf"),
      "Roboto-light": require("../../assets/fonts/Roboto-Light.ttf"),
      "Roboto-black": require("../../assets/fonts/Roboto-Black.ttf")
    })
      .then(() => dispatch(isFontLoaded()))
      .catch(err => alert(err));
  };
};

export const isFontLoaded = () => {
  return {
    type: LOAD_FONTS
  };
};
