import React from "react";
import { Dimensions, Animated, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import {
  addToFavorite,
  removeFromFavorite,
  downloadWallpaper
} from "../store/actions/index";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";
import SwipeDownToDismiss from "../components/SwipeDownToDismiss";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const DURATION = 200;

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.navigation.getParam("id");
    this.url = this.props.navigation.getParam("url");
    this.coordinates = this.props.navigation.getParam("coordinates");

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

  //download wallpaper
  onDownloadHandler = () => {
    this.props.onDownloadWallpaper(this.id, this.url);
  };

  //add/remove wallpaper from favorite
  onToggleFavoriteHandler = () => {
    if (this.props.favorite.includes(this.id)) {
      this.props.onRemoveFromFavorite(this.id);
    } else {
      this.props.onAddToFavorite(this.id);
    }
  };

  onSwipeToDismissHandler = () => {
    this.setState({ isModalOpen: false });
    this.props.navigation.goBack(null);
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

  render() {
    let platform = "md";
    if (Platform.OS === "ios") {
      platform = "ios";
    }

    const imageStyle = {
      top: this.animateBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [this.coordinates.top, 0]
      }),
      left: this.animateBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [this.coordinates.left, 0]
      }),
      height: this.animateBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [this.coordinates.height, SCREEN_HEIGHT]
      }),
      width: this.animateBackground.interpolate({
        inputRange: [0, 1],
        outputRange: [this.coordinates.width, SCREEN_WIDTH]
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

    let heartIcon = "md-heart-empty";
    for (let id of this.props.favorite) {
      if (id === this.id) {
        heartIcon = "md-heart";
      }
    }

    return (
      <Container>
        <SwipeDownToDismiss onDismiss={this.onSwipeToDismissHandler}>
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
                <Ionicons name={`${platform}-close`} size={35} color="white" />
              </TouchableOpacity>
            </Close>
            <Options>
              <TouchableOpacity onPress={this.onToggleFavoriteHandler}>
                <Ionicons name={heartIcon} size={35} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onDownloadHandler}>
                <Ionicons
                  name={`${platform}-download`}
                  size={35}
                  color="white"
                />
              </TouchableOpacity>
            </Options>
          </AnimatedHeader>
        </SwipeDownToDismiss>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  favorite: state.wallpapers.favorite
});

const mapDispatchToProps = dispatch => ({
  onAddToFavorite: id => dispatch(addToFavorite(id)),
  onRemoveFromFavorite: id => dispatch(removeFromFavorite(id)),
  onDownloadWallpaper: (id, url) => dispatch(downloadWallpaper(id, url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);

// export default Details;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  overflow: hidden;
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
