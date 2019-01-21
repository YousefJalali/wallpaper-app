import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { openDetails } from "../store/actions/index";

class WallpaperList extends React.Component {
  onPressHandler = e => {
    this.props.onOpenDetails();

    const cardWidth = (Dimensions.get("window").width - 30) / 2;
    const cardHeight = (80 * cardWidth) / 50;

    const coordinates = {
      top: e.nativeEvent.pageY - e.nativeEvent.locationY,
      left: e.nativeEvent.pageX - e.nativeEvent.locationX,
      height: cardHeight,
      width: cardWidth
      // bottom: e.nativeEvent.pageY - e.nativeEvent.locationY + cardHeight,
      // right: e.nativeEvent.pageX - e.nativeEvent.locationX + cardWidth
    };

    //   console.log(e.nativeEvent);
    //   console.log(coordinates);

    this.props.navigation.navigate("Details", {
      coordinates
    });
  };

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
            <Card onPress={e => this.onPressHandler(e)}>
              <Image
                source={{ uri: item.url }}
                style={{ resizeMode: "cover" }}
              />
            </Card>
          )}
          keyExtractor={item => `'' + ${item.id}`}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onOpenDetails: () => dispatch(openDetails())
});

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(WallpaperList)
);

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

const Card = styled.TouchableOpacity`
  width: 50%;
  padding-top: 80%;
  /* border: 1px solid blue; */
  overflow: hidden;
`;

const Image = styled.Image`
  position: absolute;
  top: 5;
  bottom: 5;
  left: 5;
  right: 5;
  border-radius: 10;
`;
