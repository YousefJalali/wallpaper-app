import React from "react";
import { I18nManager, Animated, Easing, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import storeConfig from "./src/store/storeConfig";

import Home from "./src/screens/home";
import Favorite from "./src/screens/favorite";
import Details from "./src/screens/details";

I18nManager.allowRTL(false);
const store = storeConfig();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <AppContainer />
      </Provider>
    );
  }
}

// const MainStackNavigator = createStackNavigator(
//   {
//     Main: {
//       screen: Home
//     }
//   },
//   {
//     headerMode: "none"
//   }
// );

const ModalDialogStackNavigator = createStackNavigator(
  {
    Modal: {
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
        screen: Home
      },
      Favorite: {
        screen: Favorite
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
