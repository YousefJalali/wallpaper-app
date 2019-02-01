import React from "react";
import { Animated, Dimensions, Platform, NativeModules } from "react-native";
import styled from "styled-components/native";

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const HEADER_MAX_HEIGHT = HEIGHT / 2;
const HEADER_MIN_HEIGHT = HEIGHT / 6;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const MAX_FONT_SIZE = WIDTH / 8;
const MIN_FONT_SIZE = WIDTH / 16;

export default class Header extends React.Component {
  render() {
    const { scrollY } = this.props;

    const headerHeight = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });

    const headerBackground = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ["transparent", "black"],
      extrapolate: "clamp"
    });

    const titleSize = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [MAX_FONT_SIZE, MIN_FONT_SIZE],
      extrapolate: "clamp"
    });

    return (
      <AnimatedHeader
        style={{
          height: headerHeight,
          backgroundColor: headerBackground
        }}
      >
        <AnimatedTitle style={{ fontSize: titleSize }}>
          {this.props.title}
        </AnimatedTitle>
        <Bar />
      </AnimatedHeader>
    );
  }
}

//header
const HeaderStyle = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: transparent;
  padding-top: ${STATUSBAR_HEIGHT};
  /* border: 1px solid red; */
`;

const AnimatedHeader = Animated.createAnimatedComponent(HeaderStyle);

const Title = styled.Text`
  font-family: "Raleway-black";
  color: #fff;
  text-align: center;
  margin-left: 10;
  margin-right: 10;
  /* border: 1px solid blue; */
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Bar = styled.View`
  position: absolute;
  top: ${(STATUSBAR_HEIGHT + HEADER_MIN_HEIGHT) / 2};
  /* top: ${HEADER_MIN_HEIGHT / 2}; */
  height: 1;
  left: 0;
  right: 0;
  background-color: red;
`;
