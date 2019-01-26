import React from "react";
import { withNavigation } from "react-navigation";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";
import logo from "../assets/logo.png";

const WIDTH = Dimensions.get("window").width;

const sideDrawer = props => (
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
      <Logo source={logo} style={{ resizeMode: "stretch" }} />
      <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
        <Ionicons name="md-images" size={20} color="white" />
        <MenuItem>wallpapers</MenuItem>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Favorite")}>
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

export default withNavigation(sideDrawer);

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
  padding-top: 50;
  padding-left: 10;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Logo = styled.Image`
  width: 150;
  height: 193;
  margin-bottom: 50;
  align-self: center;
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
