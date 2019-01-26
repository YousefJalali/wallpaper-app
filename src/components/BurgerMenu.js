import React from "react";
import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";

const HEIGHT = Dimensions.get("window").height;
// const WIDTH = Dimensions.get("window").width;
const HEADER_MIN_HEIGHT = HEIGHT / 6;
const BURGER_SIDE = 30;
const BAR_HEIGHT = BURGER_SIDE / 5;

export default class BurgerMenu extends React.Component {
  constructor(props) {
    super(props);

    this.transformBurger = this.props.transformBurger;
  }

  render() {
    const burgerWidth = {
      width: this.transformBurger.interpolate({
        inputRange: [0, 1],
        outputRange: [BURGER_SIDE, BURGER_SIDE / Math.sqrt(2)]
      })
    };

    const burgerTransform = {
      topBar: {
        transform: [
          {
            translateX: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: [
                0,
                -(BURGER_SIDE / Math.sqrt(2) - BURGER_SIDE / 1.6)
              ]
            })
          },
          {
            translateY: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: [0, BURGER_SIDE / 4 - BAR_HEIGHT / 5]
            })
          },
          {
            rotate: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "-45deg"]
            })
          }
        ]
      },
      bottomBar: {
        transform: [
          {
            translateX: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: [
                0,
                -(BURGER_SIDE / Math.sqrt(2) - BURGER_SIDE / 1.6)
              ]
            })
          },
          {
            translateY: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(BURGER_SIDE / 4 - BAR_HEIGHT / 5)]
            })
          },
          {
            rotate: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "45deg"]
            })
          }
        ]
      }
    };
    return (
      <Burger onPress={this.props.onPress}>
        <AnimatedBar style={[burgerWidth, burgerTransform.topBar]} />
        <Bar />
        <AnimatedBar style={[burgerWidth, burgerTransform.bottomBar]} />
      </Burger>
    );
  }
}

const Burger = styled.TouchableOpacity`
  position: absolute;
  top: ${HEADER_MIN_HEIGHT / 2 - BURGER_SIDE / 2};
  left: 10;
  height: ${BURGER_SIDE};
  width: ${BURGER_SIDE};
  /* border: 1px solid red; */
  /* overflow: hidden; */

  justify-content: space-between;
`;

const Bar = styled.View`
  width: ${BURGER_SIDE};
  height: ${BURGER_SIDE / 5};
  background-color: white;
  border-radius: 10;
`;

const AnimatedBar = Animated.createAnimatedComponent(Bar);
