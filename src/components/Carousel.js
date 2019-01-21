import React from "react";
import { Image, ScrollView } from "react-native";
import styled from "styled-components";

const renderWallpapers = data => {
  return data.map(wallpaper => (
    <Item key={wallpaper.id}>
      <Image
        source={{ uri: wallpaper.url }}
        style={{ width: 80, height: 100 }}
      />
    </Item>
  ));
};

export default props => {
  return (
    <Container>
      <Title>New</Title>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {renderWallpapers(props.data)}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

const Item = styled.View`
  width: 90;
  margin-right: 10;
  margin-left: 10;

  justify-content: center;
  align-items: center;

  height: 160;
  background-color: red;
`;

const Title = styled.Text`
  font-family: "Raleway-black";
  font-size: 20;
  color: #fff;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  text-align: left;
`;
