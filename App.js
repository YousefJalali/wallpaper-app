import React from "react";
import { I18nManager, Animated, Easing } from "react-native";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import storeConfig from "./src/store/storeConfig";

import Home from "./src/screens/home";
import Details from "./src/screens/details";

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

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 100,
      easing: Easing.linear, // easing function to use (https://facebook.github.io/react-native/docs/easing.html)
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const inputRange = [scene.index - 1, scene.index];
      const height = layout.initHeight;

      // console.log(initHeight, initWidth);

      // const opacity = position.interpolate({
      //   inputRange: inputRange,
      //   outputRange: [1, 0],
      //   extrapolate: "clamp"
      // });

      const translateY = position.interpolate({
        inputRange: inputRange,
        outputRange: [height, 0]
      });

      // let thisSceneParams = scene.route.params || {};
      // if (Object.keys(thisSceneParams).length !== 0) {
      //   thisSceneParams = scene.route.params.coordinates;

      //   const translateX = position.interpolate({
      //     inputRange: inputRange,
      //     outputRange: [thisSceneParams.left, 0]
      //   });
      //   const translateY = position.interpolate({
      //     inputRange: inputRange,
      //     outputRange: [thisSceneParams.top, 0]
      //   });
      //   const scaleX = position.interpolate({
      //     inputRange: inputRange,
      //     outputRange: [0, 1]
      //   });
      //   const scaleY = position.interpolate({
      //     inputRange: inputRange,
      //     outputRange: [0, 1]
      //   });

      //   return {
      //     opacity,
      //     transform: [{ scaleX, scaleY, translateX, translateY }]
      //   };
      // } else {
      //   return { opacity };
      // }
      return {
        // opacity,
        transform: [{ translateY }]
      };
    },
    containerStyle: {
      backgroundColor: "transparent"
    }
  };
};

// const MainStack = createStackNavigator(
//   {
//     Home: Home
//   },
//   {
//     initialRouteName: "Home",
//     defaultNavigationOptions: {
//       header: null
//     },
//     // transparentCard: true,
//     // cardStyle: {
//     //   backgroundColor: "transparent",
//     //   opacity: 1
//     // },
//     transitionConfig: () => ({
//       containerStyle: {
//         backgroundColor: "transparent"
//       }
//     })
//   }
// );

// const RootStack = createStackNavigator(
//   {
//     Main: {
//       screen: MainStack
//     },
//     Details: {
//       screen: Details
//     }
//   },
//   {
//     mode: "card",
//     headerMode: "none",
//     transparentCard: true,
//     cardStyle: {
//       backgroundColor: "transparent",
//       opacity: 1
//     },
//     cardShadowEnabled: false,
//     transitionConfig
//   }
// );

// const AppContainer = createAppContainer(RootStack);

const MainStackNavigator = createStackNavigator(
  {
    Settings: {
      screen: Home
    }
  },
  {
    headerMode: "none"
  }
);

const ModalDialogStackNavigator = createStackNavigator(
  {
    Settings: {
      screen: Details
    }
  },
  {
    transparentCard: true,
    cardStyle: {
      backgroundColor: "transparent"
    },
    headerMode: "none",
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: "transparent"
      }
    })
  }
);

const AppContainer = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: MainStackNavigator
      },
      Details: {
        screen: ModalDialogStackNavigator
      }
    },
    {
      initialRouteName: "Home",
      transparentCard: true,
      headerMode: "none",
      transitionConfig: () => ({
        screenInterpolator: sceneProps => {
          const { position, scene } = sceneProps;
          const { index } = scene;
          const opacity = position.interpolate({
            inputRange: [index - 1, index],
            outputRange: [0, 1]
          });
          return { opacity };
        }
      })
    }
  )
);
