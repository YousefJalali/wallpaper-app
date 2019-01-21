import React from "react";
import { I18nManager } from "react-native";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import storeConfig from "./src/store/storeConfig";

import Wallpapers from "./src/screens/wallpapers";

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

const AppNavigator = createStackNavigator(
  {
    Wallpapers: Wallpapers
  },
  {
    initialRouteName: "Wallpapers",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);
