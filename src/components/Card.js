import React from "react";
import styled from "styled-components/native";

export default props => (
  <Card onPress={props.onPress}>
    <Image source={{ uri: props.url }} style={{ resizeMode: "cover" }} />
  </Card>
);

const Card = styled.TouchableOpacity`
  width: 50%;
  padding-top: 80%;
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
