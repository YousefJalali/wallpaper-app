import React from 'react'
import { PanResponder, Animated, Dimensions } from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('screen').height

export default class SwipeDownToDismiss extends React.Component {
  constructor(props) {
    super(props)

    this.translateY = new Animated.Value(0)

    this.panResponder = PanResponder.create({
      //   onMoveShouldSetResponderCapture: () => true,
      //   onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: Animated.event([null, { dy: this.translateY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, { vy, dy }) => {
        if (vy >= 0.5 || dy >= 0.5 * SCREEN_HEIGHT) {
          Animated.timing(this.translateY, {
            toValue: dy > 0 ? SCREEN_HEIGHT : 0,
            duration: 200,
          }).start(this.props.onDismiss)
        } else {
          Animated.spring(this.translateY, {
            toValue: 0,
            bounciness: 10,
          }).start()
        }
      },
    })
  }
  render() {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.translateY }],
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}
