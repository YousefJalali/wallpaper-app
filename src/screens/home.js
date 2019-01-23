import React from "react";
import { connect } from "react-redux";
import {
  ActivityIndicator,
  AppState,
  Dimensions,
  Animated
} from "react-native";
import styled from "styled-components/native";

import Layout from "../components/Layout";
import FlatList from "../components/FlatList";
import Header from "../components/Header";

import { loadFonts, fetchWallpapers } from "../store/actions/index";

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

  render() {
    return this.props.isFontLoaded ? (
      <Layout>
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
              horizontal={true}
            />
            <FlatList title="Explore" data={this.props.wallpapers} />
          </ScrollViewContent>
        </ScrollView>
        <Header scrollY={this.state.scrollY} />
      </Layout>
    ) : (
      <Layout>
        <ActivityIndicator size="large" color="#ccc" />
      </Layout>
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

//scroll
const ScrollView = styled.ScrollView`
  flex: 1;
  width: ${WIDTH};
  /* border: 1px solid yellow; */
`;

const ScrollViewContent = styled.ScrollView`
  margin-top: ${HEADER_MAX_HEIGHT};
`;
