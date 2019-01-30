import React from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";

import Layout from "../components/Layout";
import FlatList from "../components/FlatList";

class Favorite extends React.Component {
  loadFavorite = () => {
    const favorite = [
      ...this.props.wallpapers.filter(fav =>
        this.props.favorite.includes(fav.id)
      )
    ];
    if (favorite.length === 0) {
      return <Text>No Favorite :(</Text>;
    }
    return (
      <FlatList title="" data={favorite} onPress={this.onCardPressHandler} />
    );
  };

  render() {
    return <Layout title="FAVORITE">{this.loadFavorite()}</Layout>;
  }
}

const mapStateToProps = state => ({
  wallpapers: state.wallpapers.wallpapers,
  favorite: state.wallpapers.favorite
});

export default connect(mapStateToProps)(Favorite);

const Text = styled.Text`
  font-family: "Raleway-bold";
  font-size: 40;
  color: white;
  opacity: 0.5;
  text-align: center;
`;
