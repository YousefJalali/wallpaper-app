import React from "react";
import { connect } from "react-redux";
import { ActivityIndicator, AppState } from "react-native";
import styled from "styled-components/native";

import Layout from "../components/Layout";
import FlatList from "../components/FlatList";

import { loadFonts, fetchWallpapers } from "../store/actions/index";

class Home extends React.Component {
  componentDidMount() {
    this.props.onLoadFonts();
    this.props.onFetchWallpapers();
  }

  render() {
    return this.props.isFontLoaded ? (
      <Layout>
        <FlatList title="New" data={this.props.wallpapers} horizontal={true} />
        <FlatList title="Explore" data={this.props.wallpapers} />
      </Layout>
    ) : (
      <View>
        <ActivityIndicator size="large" color="#ccc" />
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

const View = styled.View`
  flex: 1;
`;
