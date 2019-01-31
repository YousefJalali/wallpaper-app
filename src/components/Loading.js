import React from "react";
import styled from "styled-components/native";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;

import spinner from "../assets/spinner.json";
import checked from "../assets/checked.json";

export default class Loading extends React.Component {
  state = {
    animation: null
  };

  componentWillMount() {
    this._playAnimation();
  }

  render() {
    return (
      <Modal>
        <Lottie
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: "#eee"
          }}
          source={spinner}
        />
      </Modal>
    );
  }

  _playAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };
}

const Modal = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
