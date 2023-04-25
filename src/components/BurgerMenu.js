import React from 'react'
import { Animated, Dimensions, Platform, NativeModules } from 'react-native'
import styled from 'styled-components/native'

const { StatusBarManager } = NativeModules
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT

const HEIGHT = Dimensions.get('window').height
// const WIDTH = Dimensions.get("window").width;
const HEADER_MIN_HEIGHT = HEIGHT / 6
const BURGER_SIDE = 30
const BAR_HEIGHT = BURGER_SIDE / 5

export default class BurgerMenu extends React.Component {
  constructor(props) {
    super(props)

    this.transformBurger = this.props.transformBurger
  }

  render() {
    const burgerWidth = {
      width: this.transformBurger.interpolate({
        inputRange: [0, 1],
        outputRange: [BURGER_SIDE, BURGER_SIDE / Math.sqrt(2)],
      }),
    }

    const burgerTransform = {
      topBar: {
        transform: [
          {
            translateX: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: [
                0,
                -(BURGER_SIDE / Math.sqrt(2) - BURGER_SIDE / 1.6),
              ],
            }),
          },
          {
            translateY: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: [0, BURGER_SIDE / 4 - BAR_HEIGHT / 5],
            }),
          },
          {
            rotate: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '-45deg'],
            }),
          },
        ],
      },
      bottomBar: {
        transform: [
          {
            translateX: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: [
                0,
                -(BURGER_SIDE / Math.sqrt(2) - BURGER_SIDE / 1.6),
              ],
            }),
          },
          {
            translateY: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(BURGER_SIDE / 4 - BAR_HEIGHT / 5)],
            }),
          },
          {
            rotate: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '45deg'],
            }),
          },
        ],
      },
    }
    return (
      <Burger onPress={this.props.onPress}>
        <AnimatedBar style={[burgerWidth, burgerTransform.topBar]} />
        <Bar />
        <AnimatedBar style={[burgerWidth, burgerTransform.bottomBar]} />
      </Burger>
    )
  }
}

const Burger = styled.TouchableOpacity`
  position: absolute;
  top: ${(HEADER_MIN_HEIGHT + STATUSBAR_HEIGHT - BURGER_SIDE) / 2}px;
  left: 10px;
  height: ${BURGER_SIDE}px;
  width: ${BURGER_SIDE}px;

  justify-content: space-between;
`

const Bar = styled.View`
  width: ${BURGER_SIDE}px;
  height: ${BURGER_SIDE / 5}px;
  background-color: white;
  border-radius: 10px;
`

const AnimatedBar = Animated.createAnimatedComponent(Bar)
