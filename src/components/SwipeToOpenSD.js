import React from "react";
import { PanResponder, Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default class SwipeDownToDismiss extends React.Component {
  constructor(props) {
    super(props);

    // this.translateX = new Animated.Value(0);

    this.panResponder = PanResponder.create({
      //   onMoveShouldSetResponderCapture: () => true,
      //   onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: Animated.event([null, { dx: this.props.translateX }]),
      onPanResponderRelease: (e, { dx }) => {
        if (dx >= 0.3 * SCREEN_WIDTH) {
          Animated.timing(this.props.translateX, {
            toValue: dx > 0 ? SCREEN_WIDTH * 0.7 : 0,
            duration: 200
          }).start(this.props.onOpenSideDrawer);
        } else {
          Animated.spring(this.props.translateX, {
            toValue: 0,
            bounciness: 10
          }).start();
        }
      }
    });
  }
  render() {
    return (
      <Animated.View
        style={{
          transform: [{ translateX: this.props.translateX }],
          width: "100%",
          height: "100%",
          overflow: "hidden"
        }}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
