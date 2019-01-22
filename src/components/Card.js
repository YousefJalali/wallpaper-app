import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const WIDTH = Dimensions.get("window").width;

export default props => (
  <Card onPress={props.onPress} width={props.width} height={props.height}>
    <Image source={{ uri: props.url }} style={{ resizeMode: "cover" }} />
  </Card>
);

const Card = styled.TouchableOpacity`
  width: ${props => (props.width ? `${props.width}%` : 0)};
  padding-top: ${props => (props.width ? `${(16 * props.width) / 9}%` : 0)};

  height: ${props => (props.height ? props.height : 0)};
  padding-left: ${props => (props.height ? (9 * props.height) / 16 : 0)};

  overflow: hidden;
  border: 1px solid red;
`;

const Image = styled.Image`
  position: absolute;
  top: 5;
  bottom: 5;
  left: 5;
  right: 5;
  border-radius: 10;
`;
