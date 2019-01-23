import React from "react";
import { Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import styled from "styled-components/native";
import Card from "./Card";

class FlatListComponent extends React.Component {
  _renderItem = ({ item }, height, width) => {
    return (
      <Card
        onPress={e => this.onCardPressHandler(e, item.id, item.url, height, width)}
        url={item.url}
        width={width}
        height={height}
      />
    );
  };

  onCardPressHandler = (e, id, url, height, width) => {
    const screenWidth = Dimensions.get("window").width;

    let cardWidth = width;
    let cardHeight = height;

    if (height !== null) {
      cardHeight = height - 10;
      cardWidth = (9 * height) / 16 - 10;
    }

    if (width !== null) {
      cardWidth = (screenWidth - 30) / 2;
      cardHeight = (16 * (screenWidth - 20)) / 2 / 9;
    }

    const coordinates = {
      top: e.nativeEvent.pageY - e.nativeEvent.locationY,
      left: e.nativeEvent.pageX - e.nativeEvent.locationX,
      height: cardHeight,
      width: cardWidth
    };

    this.props.navigation.navigate("Details", {
      id,
      coordinates,
      url
    });
  };

  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
        {this.props.horizontal ? (
          <FlatList
            data={this.props.data}
            height={180}
            horizontal={true}
            renderItem={({ item }) => this._renderItem({ item }, 180, null)}
            keyExtractor={item => `'' + ${item.id}`}
          />
        ) : (
          <FlatList
            data={this.props.data}
            numColumns={2}
            renderItem={({ item }) => this._renderItem({ item }, null, 50)}
            keyExtractor={item => `'' + ${item.id}`}
          />
        )}
      </Container>
    );
  }
}

export default withNavigation(FlatListComponent);

const Container = styled.View`
  flex: 1;
  margin-bottom: 20;
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
  padding-right: 5;
  padding-left: 5;
  height: ${props => (props.horizontal ? props.height || 180 : "100%")};
`;
