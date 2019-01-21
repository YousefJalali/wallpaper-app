import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import { closeDetails } from "../store/actions/index";

export default class Details extends React.Component {
  render() {
    const { navigation } = this.props;
    const coordinates = navigation.getParam("coordinates");

    return (
      <Container>
        <Image
          source={this.props.img}
          style={{ height: "100%", width: "100%", resizeMode: "cover" }}
        />
        <Header>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss "
          />
        </Header>
        <Card coordinates={coordinates} />
      </Container>
    );
  }
}

const Container = styled.View`
  height: 50%;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const Header = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20%;
  border: 1px solid blue;
  justify-content: center;
  align-items: center;
`;

const Button = styled.Button`
  border: 1px solid blue;
`;

const Card = styled.View`
  background-color: yellow;
  position: absolute;
  top: ${props => props.coordinates.top};
  left: ${props => props.coordinates.left};

  height: ${props => props.coordinates.height};

  width: ${props => props.coordinates.width};
`;
