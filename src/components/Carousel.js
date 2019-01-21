import React from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const renderWallpapers = data => {
  return data.map((wallpaper, index) => (
    <Item key={wallpaper.id} index={index} length={data.length}>
      <Image source={{ uri: wallpaper.url }} style={{ resizeMode: "cover" }} />
    </Item>
  ));
};

export default props => {
  return (
    <Container>
      <Title>New</Title>
      {props.data ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {renderWallpapers(props.data)}
        </ScrollView>
      ) : (
        <Loading>
          <ActivityIndicator />
        </Loading>
      )}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  margin-bottom: 20
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

const Item = styled.View`
  width: 90;
  height: 160;

  margin-right: ${props => (props.index === props.length - 1 ? 10 : 5)};
  margin-left: ${props => (props.index === 0 ? 10 : 5)};
`;

const Image = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 10;
`;

const Loading = styled.View`
  width: 100%;
  height: 160;
  justify-content: center;
  align-items: center;
`;
