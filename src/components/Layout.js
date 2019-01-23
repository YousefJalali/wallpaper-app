import React from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo";

import background from "../assets/hero.jpg";

export default props => (
  <View>
    <ImageBackground
      source={background}
      style={{ width: "100%", height: "100%" }}
    >
      <LinearGradient
        colors={["#000", "transparent", "#000"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }}
      />
      {props.children}
    </ImageBackground>
  </View>
);

const View = styled.View`
  flex: 1;
`;

const ImageBackground = styled.ImageBackground`
  justify-content: center;
  align-items: center;
`;
