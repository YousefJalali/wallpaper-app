import React from "react";
import { Dimensions, Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import { closeDetails } from "../store/actions/index";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

class Details extends React.Component {
  state = {
    expandBackground: new Animated.Value(0),
    expandHeader: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.sequence([
      // Animated.delay(3000),
      this.expandBackground(),
      this.expandHeader()
    ]).start();
  }

  onCloseHandler = () => {
    this.props.onCloseDetails();
    this.props.navigation.goBack(null);
  };

  expandBackground = () =>
    Animated.timing(this.state.expandBackground, {
      toValue: 1,
      // delay: 1000,
      duration: 300
    });

  expandHeader = () =>
    Animated.timing(this.state.expandHeader, {
      toValue: 1,
      duration: 300
    });

  render() {
    const { navigation } = this.props;
    const coordinates = navigation.getParam("coordinates");
    const url = navigation.getParam("url");

    const { expandBackground, expandHeader } = this.state;

    const imageStyle = {
      top: expandBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.top, 0]
      }),
      left: expandBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.left, 0]
      }),
      height: expandBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.height, SCREEN_HEIGHT]
      }),
      width: expandBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.width, SCREEN_WIDTH]
      })
    };

    const headerStyle = {
      top: expandHeader.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_HEIGHT / 8, 0]
      })
    };

    return (
      <Container>
        <AnimatedImage
          source={{ uri: url }}
          style={[imageStyle, { resizeMode: "cover" }]}
          coordinates={coordinates}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.5)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: SCREEN_HEIGHT / 2
          }}
        />
        <AnimatedHeader style={headerStyle}>
          <Close>
            <TouchableOpacity onPress={this.onCloseHandler}>
              <Ionicons name="md-close" size={40} color="white" />
            </TouchableOpacity>
          </Close>
          <Options>
            <TouchableOpacity onPress={this.onCloseHandler}>
              <Ionicons name="md-heart-empty" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onCloseHandler}>
              <Ionicons name="md-download" size={40} color="white" />
            </TouchableOpacity>
          </Options>
        </AnimatedHeader>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onCloseDetails: () => dispatch(closeDetails())
});

export default connect(
  null,
  mapDispatchToProps
)(Details);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const Header = styled.View`
  position: absolute;
  left: 10;
  right: 10;
  height: ${SCREEN_HEIGHT / 8};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AnimatedHeader = Animated.createAnimatedComponent(Header);

const Close = styled.View`
  flex: 3;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Options = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.Image`
  position: absolute;
`;

const AnimatedImage = Animated.createAnimatedComponent(Image);
