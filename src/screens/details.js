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
    slideDownHeader: new Animated.Value(0),

    shrinkBackground: new Animated.Value(1),
    slideUpHeader: new Animated.Value(1),

    isModalOpen: false
  };

  componentDidMount() {
    Animated.sequence([
      // Animated.delay(3000),
      this.expandBackground(),
      this.slideDownHeader()
    ]).start(() => this.setState({ isModalOpen: true }));
  }

  expandBackground = () =>
    Animated.timing(this.state.expandBackground, {
      toValue: 1,
      // delay: 1000,
      duration: 300
    });
  shrinkBackground = () =>
    Animated.timing(this.state.shrinkBackground, {
      toValue: 0,
      // delay: 1000,
      duration: 300
    });

  slideDownHeader = () =>
    Animated.timing(this.state.slideDownHeader, {
      toValue: 1,
      duration: 300
    });
  slideUpHeader = () =>
    Animated.timing(this.state.slideUpHeader, {
      toValue: 0,
      duration: 300
    });

  //close modal
  onCloseHandler = () => {
    // this.props.onCloseDetails();
    Animated.sequence([this.slideUpHeader(), this.shrinkBackground()]).start(
      () => {
        this.setState({ isModalOpen: false });
        this.props.navigation.goBack(null);
      }
    );
  };

  render() {
    const { navigation } = this.props;
    const coordinates = navigation.getParam("coordinates");
    const url = navigation.getParam("url");

    const {
      expandBackground,
      shrinkBackground,
      slideDownHeader,
      slideUpHeader
    } = this.state;

    let backgroundAnimation = expandBackground;
    let headerAnimation = slideDownHeader;

    if (this.state.isModalOpen) {
      backgroundAnimation = shrinkBackground;
      headerAnimation = slideUpHeader;
    }

    const imageStyle = {
      top: backgroundAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.top, 0]
      }),
      left: backgroundAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.left, 0]
      }),
      height: backgroundAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.height, SCREEN_HEIGHT]
      }),
      width: backgroundAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.width, SCREEN_WIDTH]
      })
    };

    const slideDownHeaderStyle = {
      top: headerAnimation.interpolate({
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
        <AnimatedHeader style={slideDownHeaderStyle}>
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
