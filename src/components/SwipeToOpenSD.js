import React from "react";
import { PanResponder, Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default class SwipeDownToDismiss extends React.Component {
  constructor(props) {
    super(props);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderRelease: (e, { dx }) => {
        if (Math.abs(dx) > SCREEN_WIDTH * 0.3) {
          this.props.toggleSideDrawer();
        }
      }
    });
  }
  render() {
    return (
      <Animated.View
        style={{
          width: "100%",
          height: "100%"
        }}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
