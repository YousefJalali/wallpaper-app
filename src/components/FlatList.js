import React from "react";
import styled from "styled-components/native";
import Card from "./Card";

const _renderItem = ({ item }, props, height, width) => {
  return (
    <Card
      onPress={e => props.onPress(e, item.url, height, width)}
      url={item.url}
      width={width}
      height={height}
    />
  );
};

export default props => (
  <Container>
    <Title>{props.title}</Title>
    {props.horizontal ? (
      <FlatList
        data={props.data}
        height={180}
        horizontal={true}
        renderItem={({ item }) => _renderItem({ item }, props, 180, null)}
        keyExtractor={item => `'' + ${item.id}`}
      />
    ) : (
      <FlatList
        data={props.data}
        numColumns={2}
        renderItem={({ item }) => _renderItem({ item }, props, null, 50)}
        keyExtractor={item => `'' + ${item.id}`}
      />
    )}
  </Container>
);

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
