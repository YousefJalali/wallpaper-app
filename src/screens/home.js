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
import FlatList from "../components/FlatList";
import Header from "../components/Header";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const HEADER_MAX_HEIGHT = HEIGHT / 2;

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

  onCardPressHandler = (e, url, height, width) => {
    const screenWidth = Dimensions.get("window").width;

    let cardWidth = width;
    let cardHeight = height;

    if (height !== null) {
      cardHeight = height;
      cardWidth = (9 * height) / 16;
    }

    if (width !== null) {
      cardWidth = (screenWidth - 30) / 2;
      cardHeight = (16 * cardWidth) / 9;
    }

    const coordinates = {
      top: e.nativeEvent.pageY - e.nativeEvent.locationY,
      left: e.nativeEvent.pageX - e.nativeEvent.locationX,
      height: cardHeight,
      width: cardWidth
    };

    this.props.navigation.navigate("Details", {
      coordinates,
      url
    });
  };

  render() {
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
                <FlatList
                  title="New"
                  data={this.props.wallpapers}
                  onPress={this.onCardPressHandler}
                  horizontal={true}
                />
                <FlatList
                  title="Explore"
                  data={this.props.wallpapers}
                  onPress={this.onCardPressHandler}
                />
              </ScrollViewContent>
            </ScrollView>
            <Header scrollY={this.state.scrollY} />
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
