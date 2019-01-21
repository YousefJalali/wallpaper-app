import React from "react";
import { I18nManager, Animated, Easing } from "react-native";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import storeConfig from "./src/store/storeConfig";

import Home from "./src/screens/home";
import Details from './src/screens/details';

I18nManager.allowRTL(false);
const store = storeConfig();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

// const transitionConfig = () => {
//   return {
//     transitionSpec: {
//       duration: 1000,
//       easing: Easing.linear, // easing function to use (https://facebook.github.io/react-native/docs/easing.html)
//       timing: Animated.timing,
//       useNativeDriver: true
//     },
//     screenInterpolator: sceneProps => {
//       const { layout, position, scene, scenes } = sceneProps;
//       const inputRange = [scene.index - 1, scene.index];
//       const initWidth = layout.initWidth; // the width of the current screen
//       const initHeight = layout.initHeight; // the width of the current screen

//       console.log(initHeight, initWidth);

//       const opacity = position.interpolate({
//         inputRange: inputRange,
//         outputRange: [1, 1],
//         extrapolate: "clamp"
//       });

//       let thisSceneParams = scene.route.params || {};
//       if (Object.keys(thisSceneParams).length !== 0) {
//         thisSceneParams = scene.route.params.coordinates;

//         const translateX = position.interpolate({
//           inputRange: inputRange,
//           outputRange: [thisSceneParams.left, 0]
//         });
//         const translateY = position.interpolate({
//           inputRange: inputRange,
//           outputRange: [thisSceneParams.top, 0]
//         });
//         const scaleX = position.interpolate({
//           inputRange: inputRange,
//           outputRange: [0, 1]
//         });
//         const scaleY = position.interpolate({
//           inputRange: inputRange,
//           outputRange: [0, 1]
//         });

//         return {
//           opacity,
//           transform: [{ scaleX, scaleY, translateX, translateY }]
//         };
//       } else {
//         return { opacity };
//       }
//     }
//   };
// };

const MainStack = createStackNavigator(
  {
    Home: Home
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    Details: {
      screen: Details
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    // transitionConfig
  }
);

const AppContainer = createAppContainer(RootStack);
