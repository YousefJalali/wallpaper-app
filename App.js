import React from "react";
import { I18nManager, StatusBar } from "react-native";
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

const HomeStack = createStackNavigator(
  {
    Home: Home
  },
  {
    headerMode: "none"
  }
);

const FavoriteStack = createStackNavigator(
  {
    Favorite: Favorite
  },
  {
    headerMode: "none"
  }
);

const DetailsModal = createStackNavigator(
  {
    Details: Details
  },
  {
    transparentCard: true,
    cardStyle: {
      backgroundColor: "transparent"
    },
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: true,
    },
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: "transparent"
      }
    })
  }
);

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeStack
    },
    Favorite: {
      screen: FavoriteStack
    },
    Details: {
      screen: DetailsModal
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
);

// const DrawerNavigator = DrawerNavigator(RootStack);

const AppContainer = createAppContainer(RootStack);
