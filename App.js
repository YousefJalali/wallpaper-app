import React from 'react'
import { I18nManager, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import storeConfig from './src/store/storeConfig'
import 'react-native-gesture-handler'

import Home from './src/screens/home'
import Favorite from './src/screens/favorite'
import About from './src/screens/about'
import Details from './src/screens/details'

I18nManager.allowRTL(false)
const store = storeConfig()

const RootStack = createStackNavigator()

const options = {
  headerMode: 'none',
  animationEnabled: false,
  // cardShadowEnabled: false,
  // cardStyle: {
  //   backgroundColor: 'transparent',
  // },
  // transitionConfig: () => ({
  //   containerStyle: {
  //     backgroundColor: 'transparent',
  //   },
  // }),
  // defaultNavigationOptions: {
  //   cardStyle: {
  //     backgroundColor: 'transparent',
  //   },
  // },
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 1,
  //     useNativeDriver: true,
  //   },
  //   screenInterpolator: (sceneProps) => {
  //     const { position, scene } = sceneProps
  //     const { index } = scene
  //     const opacity = position.interpolate({
  //       inputRange: [index - 1, index],
  //       outputRange: [0, 1],
  //     })
  //     return { opacity }
  //   },
  // }),
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle='light-content' translucent />
        {/* <AppContainer /> */}
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Group
              screenOptions={{ headerMode: 'none', animationEnabled: false }}
            >
              <RootStack.Screen name='Home' component={Home} />
              <RootStack.Screen name='Favorite' component={Favorite} />
              <RootStack.Screen name='About' component={About} />
            </RootStack.Group>
            <RootStack.Group
              screenOptions={{
                headerMode: 'none',
                gestureEnabled: true,
                presentation: 'transparentModal',
              }}
            >
              <RootStack.Screen name='Details' component={Details} />
            </RootStack.Group>
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

// const HomeStack = createStackNavigator(
//   {
//     Home: Home,
//   },
//   {
//     headerMode: 'none',
//   }
// )

// const FavoriteStack = createStackNavigator(
//   {
//     Favorite: Favorite,
//   },
//   {
//     headerMode: 'none',
//   }
// )

// const AboutStack = createStackNavigator(
//   {
//     About: About,
//   },
//   {
//     headerMode: 'none',
//   }
// )

// const DetailsModal = createStackNavigator(
//   {
//     Details: Details,
//   },
//   {
//     headerMode: 'none',
//     defaultNavigationOptions: {
//       gestureEnabled: true,
//     },
//     // transitionConfig: () => ({
//     //   containerStyle: {
//     //     backgroundColor: 'transparent',
//     //   },
//     // }),
//   }
// )

// const RootStack = createStackNavigator(
//   {
//     Home: {
//       screen: HomeStack,
//     },
//     Favorite: {
//       screen: FavoriteStack,
//     },
//     About: {
//       screen: AboutStack,
//     },
//     Details: {
//       screen: DetailsModal,
//     },
//   },
//   {
//     initialRouteName: 'Home',
//     defaultNavigationOptions: {
//       cardStyle: {
//         backgroundColor: 'transparent',
//       },
//     },
//     headerMode: 'none',

//     transitionConfig: () => ({
//       containerStyle: {
//         backgroundColor: 'transparent',
//       },
//     }),
//     // transitionConfig: () => ({
//     //   transitionSpec: {
//     //     duration: 1,
//     //     useNativeDriver: true,
//     //   },
//     //   screenInterpolator: (sceneProps) => {
//     //     const { position, scene } = sceneProps
//     //     const { index } = scene
//     //     const opacity = position.interpolate({
//     //       inputRange: [index - 1, index],
//     //       outputRange: [0, 1],
//     //     })
//     //     return { opacity }
//     //   },
//     // }),
//   }
// )

// const DrawerNavigator = DrawerNavigator(RootStack);

// const AppContainer = createAppContainer(RootStack)
