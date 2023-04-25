import * as Font from 'expo-font'
import { Asset } from 'expo-asset'

const cacheImages = (images) => {
  return images.map((image) => {
    // if (typeof image === 'string') {
    //   return Image.prefetch(image);
    // } else {
    return Asset.fromModule(image).downloadAsync()
    // }
  })
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font))
}

export const loadAssetsAsync = async () => {
  const imageAssets = cacheImages([
    require('../../assets/hero.jpg'),
    require('../../assets/logo.png'),
  ])

  const fontAssets = cacheFonts([
    {
      'Raleway-bold': require('../../assets/fonts/Raleway-Bold.ttf'),
      'Raleway-black': require('../../assets/fonts/Raleway-Black.ttf'),
      'Raleway-medium': require('../../assets/fonts/Raleway-Medium.ttf'),
      'Roboto-light': require('../../assets/fonts/Roboto-Light.ttf'),
      'Roboto-black': require('../../assets/fonts/Roboto-Black.ttf'),
    },
  ])

  await Promise.all([...imageAssets, ...fontAssets])
}

// export const loadIcons = () => dispatch => {
//   Font.loadAsync({
//     "Raleway-bold": require("../../assets/fonts/Raleway-Bold.ttf"),
//     "Raleway-black": require("../../assets/fonts/Raleway-Black.ttf"),
//     "Raleway-medium": require("../../assets/fonts/Raleway-Medium.ttf"),
//     "Roboto-light": require("../../assets/fonts/Roboto-Light.ttf"),
//     "Roboto-black": require("../../assets/fonts/Roboto-Black.ttf")
//   })
//     .then(() => dispatch(isIconsLoaded()))
//     .catch(err => alert(err));
// };

// export const isIconsLoaded = () => {
//   return {
//     type: LOAD_FONTS
//   };
// };
