import React from "react";
import { connect } from "react-redux";
import {
  ActivityIndicator,
  AppState,
  Dimensions,
  Animated
} from "react-native";
import { LinearGradient } from "expo";
import styled from "styled-components/native";

import { loadFonts, fetchWallpapers } from "../store/actions/index";
import background from "../assets/hero.jpg";
import Carousel from "../components/Carousel";
import WallpapersList from "../components/WallpapersList";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const HEADER_MAX_HEIGHT = HEIGHT / 2;
const HEADER_MIN_HEIGHT = HEIGHT / 6;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const MAX_FONT_SIZE = WIDTH / 8;
const MIN_FONT_SIZE = WIDTH / 16;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.props.onLoadFonts();
    this.props.onFetchWallpapers();
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });

    const headerBackground = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ["transparent", "black"],
      extrapolate: "clamp"
    });

    const titleSize = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [MAX_FONT_SIZE, MIN_FONT_SIZE],
      extrapolate: "clamp"
    });

    return (
      <View>
        {this.props.isFontLoaded ? (
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
              <ScrollViewContent>
                <Carousel data={this.props.wallpapers} />
                <WallpapersList
                  data={this.props.wallpapers}
                  // onPress={() => this.props.navigation.navigate('MyModal')}
                />
              </ScrollViewContent>
            </ScrollView>

            <AnimatedHeader
              style={{
                height: headerHeight,
                backgroundColor: headerBackground
              }}
            >
              <AnimatedTitle style={{ fontSize: titleSize }}>
                SKULL WALLPAPERS
              </AnimatedTitle>
            </AnimatedHeader>
          </ImageBackground>
        ) : (
          <ImageBackground
            source={background}
            style={{ width: "100%", height: "100%" }}
          >
            <ActivityIndicator size="large" color="#ccc" />
          </ImageBackground>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFontLoaded: state.ui.isFontLoaded,
    wallpapers: state.wallpapers.wallpapers,
    isDetailsVisible: state.wallpapers.isDetailsVisible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadFonts: () => dispatch(loadFonts()),
    onFetchWallpapers: () => dispatch(fetchWallpapers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

//layout & background
const View = styled.View`
  flex: 1;
`;

const ImageBackground = styled.ImageBackground`
  justify-content: center;
  align-items: center;
`;

//scroll
const ScrollView = styled.ScrollView`
  flex: 1;
  width: ${WIDTH};
  /* border: 1px solid yellow; */
`;

const ScrollViewContent = styled.ScrollView`
  margin-top: ${HEADER_MAX_HEIGHT};
`;

//header
const Header = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  overflow: hidden;
  background-color: transparent;
`;

const AnimatedHeader = Animated.createAnimatedComponent(Header);

const Title = styled.Text`
  font-family: "Raleway-black";
  /* font-size: ${WIDTH / 8}; */
  color: #fff;
  text-align: center;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);
