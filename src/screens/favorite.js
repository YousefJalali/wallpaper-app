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
    console.log(favorite);
    return favorite;
  };

  render() {
    return (
      <Layout title="FAVORITE">
        <FlatList
          title="Explore"
          data={this.loadFavorite()}
          onPress={this.onCardPressHandler}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  wallpapers: state.wallpapers.wallpapers,
  favorite: state.wallpapers.favorite
});

export default connect(mapStateToProps)(Favorite);
