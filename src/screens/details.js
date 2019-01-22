import React from "react";
import { Dimensions, Animated } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import { closeDetails } from "../store/actions/index";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class Details extends React.Component {
  state = {
    expand: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.expand, {
      toValue: 1,
      // delay: 100,
      duration: 300
      // useNativeDriver: true
    }).start();
  }

  onCloseHandler = () => {
    this.props.onCloseDetails();
    this.props.navigation.goBack(null);
  };

  render() {
    const { navigation } = this.props;
    const coordinates = navigation.getParam("coordinates");
    const url = navigation.getParam("url");

    const imageStyle = {
      top: this.state.expand.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.top, 0]
      }),
      left: this.state.expand.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.left, 0]
      }),
      height: this.state.expand.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.height, SCREEN_HEIGHT]
      }),
      width: this.state.expand.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.width, SCREEN_WIDTH]
      })
    };

    return (
      <Container>
        <AnimatedImage
          source={{ uri: url }}
          style={[imageStyle, { resizeMode: "cover" }]}
          // style={{ resizeMode: "cover" }}
          coordinates={coordinates}
        />
        <Header>
          <Button onPress={this.onCloseHandler} title="Dismiss " />
        </Header>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onCloseDetails: () => dispatch(closeDetails())
});

export default connect(
  null,
  mapDispatchToProps
)(Details);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
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

const Image = styled.Image`
  position: absolute;
  /* top: ${props => props.coordinates.top};
  left: ${props => props.coordinates.left};
  right: ${props => SCREEN_WIDTH - props.coordinates.right};
  bottom: ${props => SCREEN_HEIGHT - props.coordinates.bottom}; */
`;

const AnimatedImage = Animated.createAnimatedComponent(Image);
