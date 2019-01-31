import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;

import spinner from "../assets/spinner.json";
import checked from "../assets/checked.json";

export default class Loading extends React.Component {
  componentWillUnmount() {
    this.animation.reset();
  }
  componentDidMount() {
    this.animation.play();
  }

  render() {
    const src = this.props.type === "loading" ? spinner : checked;
    return (
      <Modal>
        <Container>
          <Animation>
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={{ height: 100, width: 100 }}
              source={src}
            />
          </Animation>
        </Container>
      </Modal>
    );
  }
}

const Modal = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;

  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  background-color: rgba(0, 0, 0, 1);
  width: 150;
  height: 150;
  border-radius: 15;
  opacity: 0.5;

  justify-content: center;
  align-items: center;
`;

const Animation = styled.View`
  width: 100;
  height: 100;
`;
