import React from "react";
import styled from "styled-components/native";

export default props => (
  <Card onPress={props.onPress} width={props.width} height={props.height}>
    <Image
      source={{ uri: props.url, cache: "default" }}
      style={{ resizeMode: "cover" }}
    />
  </Card>
);

const Card = styled.TouchableOpacity`
  width: ${props => (props.width ? `${props.width}%` : 0)};
  padding-top: ${props => (props.width ? `${(16 * props.width) / 9}%` : 0)};

  height: ${props => (props.height ? props.height : 0)};
  padding-left: ${props => (props.height ? (9 * props.height) / 16 : 0)};

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
