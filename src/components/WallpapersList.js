import React from "react";
import styled from "styled-components/native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { openDetails } from "../store/actions/index";
import Card from "../components/Card";

class WallpaperList extends React.Component {
  render() {
    return (
      <Container>
        <Title>Explore</Title>
        <FlatList
          data={this.props.data}
          numColumns={2}
          columnWrapperStyle={{
            paddingHorizontal: 5,
            boxSizing: "border-box"
          }}
          renderItem={({ item }) => (
            <Card
              onPress={e => this.props.onPress(e, item.url)}
              url={item.url}
            />
          )}
          keyExtractor={item => `'' + ${item.id}`}
        />
      </Container>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   onOpenDetails: () => dispatch(openDetails())
// });

// export default withNavigation(
//   connect(
//     null,
//     mapDispatchToProps
//   )(WallpaperList)
// );

export default WallpaperList;

const Container = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-family: "Raleway-black";
  font-size: 20;
  color: #fff;
  padding-top: 10;
  padding-bottom: 5;
  padding-left: 10;
  text-align: left;
`;

const FlatList = styled.FlatList`
  flex: 1;
`;
