import React from "react";
import {
  ActivityIndicator,
  AppState,
  Dimensions,
  Animated
} from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo";
import { withNavigation } from "react-navigation";

import background from "../assets/hero.jpg";
import Header from "../components/Header";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const HEADER_MAX_HEIGHT = HEIGHT / 2;

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  onBurgerPressHandler = () => {
    this.props.navigation.navigate("SideDrawer");
  };

  render() {
    return (
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

          <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
            ])}
          >
            <ScrollViewContent>{this.props.children}</ScrollViewContent>
          </ScrollView>
          <Header
            scrollY={this.state.scrollY}
            onPress={this.onBurgerPressHandler}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default withNavigation(Layout);

const View = styled.View`
  flex: 1;
`;

const ImageBackground = styled.ImageBackground`
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
  width: ${WIDTH};
  /* border: 1px solid yellow; */
`;

const ScrollViewContent = styled.ScrollView`
  margin-top: ${HEADER_MAX_HEIGHT};
`;
