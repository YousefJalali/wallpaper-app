import React from "react";
import styled from "styled-components/native";

export default class SideDrawer extends React.Component {
  render() {
    return (
      <Container>
        <Menu>
          <TouchableOpacity>
            <MenuItem />
          </TouchableOpacity>
          <TouchableOpacity>
            <MenuItem />
          </TouchableOpacity>
          <TouchableOpacity>
            <MenuItem />
          </TouchableOpacity>
        </Menu>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: red;
`;

const Menu = styled.View`
  width: 50%;
  height: 100%;
  border: 1px solid blue;
`;

const TouchableOpacity = styled.TouchableOpacity`
  border: 1px solid black;
`;

const MenuItem = styled.Text`
  font-size: 30;
  border: 1px solid yellow;
`;
