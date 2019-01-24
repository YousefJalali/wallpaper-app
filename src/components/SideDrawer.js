import React from "react";
// import { connect } from "react-redux";
import { Dimensions, Animated } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";
// import { openSideDrawer, closeSideDrawer } from "../store/actions/index";

// const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
// const HEADER_MAX_HEIGHT = HEIGHT / 2;
// const HEADER_MIN_HEIGHT = HEIGHT / 6;
// const DURATION = 1000;

export default () => (
  <Container onPress={this.onCloseHandler}>
    <LinearGradient
      start={[0, 0.5]}
      end={[1, 0.5]}
      colors={["#000", "transparent"]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }}
    />
    <Menu>
      <TouchableOpacity>
        <Ionicons name="md-images" size={20} color="white" />
        <MenuItem>wallpapers</MenuItem>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="md-heart-empty" size={20} color="white" />
        <MenuItem>favorite</MenuItem>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons
          name="md-information-circle-outline"
          size={20}
          color="white"
        />
        <MenuItem>about</MenuItem>
      </TouchableOpacity>
    </Menu>
  </Container>
);

const Container = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${-WIDTH * 0.7};
  width: ${WIDTH * 0.7};
  background-color: transparent;
  /* border: 1px solid blue; */
`;

const Menu = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 150;
  padding-left: 10;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TouchableOpacity = styled.TouchableOpacity`
  /* border: 1px solid black; */
  padding-bottom: 20;
  padding-left: 10;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const MenuItem = styled.Text`
  font-family: "Raleway-bold";
  font-size: 20;
  /* border: 1px solid yellow; */
  color: white;
  padding-left: 10;
`;
