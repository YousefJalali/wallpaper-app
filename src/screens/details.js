import React from "react";
import { Dimensions, Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import { addToFavorite, removeFromFavorite } from "../store/actions/index";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const DURATION = 200;

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.navigation.getParam("id");
    this.url = this.props.navigation.getParam("url");

    this.fadeGradient = new Animated.Value(0);
    this.animateBackground = new Animated.Value(0);
    this.slideHeader = new Animated.Value(0);

    this.state = {
      isModalOpen: false,
      isButtonFavPressed: false
    };
  }

  componentDidMount() {
    Animated.sequence([
      this.fadeInGradient(),
      this.expandBackground(),
      this.slideDownHeader()
    ]).start(() => this.setState({ isModalOpen: true }));
  }

  //close modal
  onCloseHandler = () => {
    Animated.sequence([
      this.fadeOutGradient(),
      this.slideUpHeader(),
      this.shrinkBackground()
    ]).start(() => {
      this.setState({ isModalOpen: false });
      this.props.navigation.goBack(null);
    });
  };

  //gradient animation
  fadeInGradient = () =>
    Animated.timing(this.fadeGradient, {
      toValue: 1,
      duration: DURATION / 10
    });
  fadeOutGradient = () => {
    this.fadeGradient.setValue(1);
    return Animated.timing(this.fadeGradient, {
      toValue: 0,
      duration: DURATION
    });
  };

  //image animation
  expandBackground = () =>
    Animated.timing(this.animateBackground, {
      toValue: 1,
      duration: DURATION
    });
  shrinkBackground = () => {
    this.animateBackground.setValue(1);
    return Animated.timing(this.animateBackground, {
      toValue: 0,
      duration: DURATION
    });
  };

  //header animation
  slideDownHeader = () =>
    Animated.timing(this.slideHeader, {
      toValue: 1,
      duration: DURATION
    });
  slideUpHeader = () => {
    this.slideHeader.setValue(1);
    return Animated.timing(this.slideHeader, {
      toValue: 0,
      duration: DURATION
    });
  };

  onToggleFavoriteHandler = () => {
    if (this.state.isButtonFavPressed) {
      this.props.onRemoveFromFavorite(this.id);
    } else {
      this.props.onAddToFavorite(this.id);
    }
    this.setState(prevState => ({
      isButtonFavPressed: !prevState.isButtonFavPressed
    }));
    this.props.navigation.navigate("Favorite");
  };

  render() {
    const coordinates = this.props.navigation.getParam("coordinates");

    const imageStyle = {
      top: this.animateBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.top, 0]
      }),
      left: this.animateBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.left, 0]
      }),
      height: this.animateBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.height, SCREEN_HEIGHT]
      }),
      width: this.animateBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [coordinates.width, SCREEN_WIDTH]
      }),
      borderRadius: this.animateBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 0]
      })
    };

    const headerStyle = {
      top: this.slideHeader.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_HEIGHT / 8, 0]
      })
    };

    return (
      <Container>
        <AnimatedImage
          source={{ uri: this.url }}
          style={[imageStyle, { resizeMode: "cover" }]}
        />

        <AnimatedGradient style={{ opacity: this.fadeGradient }}>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.5)", "transparent"]}
            style={{
              flex: 1
            }}
          />
        </AnimatedGradient>

        <AnimatedHeader style={headerStyle}>
          <Close>
            <TouchableOpacity onPress={this.onCloseHandler}>
              <Ionicons name="md-close" size={40} color="white" />
            </TouchableOpacity>
          </Close>
          <Options>
            <TouchableOpacity onPress={this.onToggleFavoriteHandler}>
              <Ionicons name="md-heart-empty" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onCloseHandler}>
              <Ionicons name="md-download" size={40} color="white" />
            </TouchableOpacity>
          </Options>
        </AnimatedHeader>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddToFavorite: id => dispatch(addToFavorite(id)),
  onRemoveFromFavorite: id => dispatch(removeFromFavorite(id))
});

export default connect(
  null,
  mapDispatchToProps
)(Details);

// export default Details;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const Gradient = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: ${SCREEN_HEIGHT / 2};
`;

const AnimatedGradient = Animated.createAnimatedComponent(Gradient);

const Header = styled.View`
  position: absolute;
  left: 10;
  right: 10;
  height: ${SCREEN_HEIGHT / 6};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AnimatedHeader = Animated.createAnimatedComponent(Header);

const Close = styled.View`
  flex: 3;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Options = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.Image`
  position: absolute;
`;

const AnimatedImage = Animated.createAnimatedComponent(Image);
