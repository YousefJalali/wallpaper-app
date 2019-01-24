import React from "react";
import {
  ActivityIndicator,
  AppState,
  Dimensions,
  Animated,
  Easing
} from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import { LinearGradient } from "expo";
import { withNavigation } from "react-navigation";
import { openSideDrawer, closeSideDrawer } from "../store/actions/index";

import background from "../assets/hero.jpg";
import Header from "../components/Header";
import SideDrawer from "../components/SideDrawer";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const HEADER_MAX_HEIGHT = HEIGHT / 2;
const HEADER_MIN_HEIGHT = HEIGHT / 6;
const DURATION = 300;

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.scroll = new Animated.Value(0);
    this.slideContent = new Animated.Value(0);
    this.transformBurger = new Animated.Value(0);

    this.state = {
      isSideDrawerOpen: false
    };
  }

  //slide out and in the content
  slideOutContent = () =>
    Animated.timing(this.slideContent, {
      toValue: 1,
      easing: Easing.cubic,
      duration: DURATION
    });
  slideInContent = () => {
    this.slideContent.setValue(1);
    return Animated.timing(this.slideContent, {
      toValue: 0,
      easing: Easing.sin,
      duration: DURATION
    });
  };

  //turn burger icon to back icon
  burgerToBack = () =>
    Animated.timing(this.transformBurger, {
      toValue: 1,
      // easing: Easing.cubic,
      duration: DURATION
    });
  backToBurger = () => {
    this.transformBurger.setValue(1);
    return Animated.timing(this.transformBurger, {
      toValue: 0,
      // easing: Easing.sin,
      duration: DURATION
    });
  };

  onBurgerPressHandler = () => {
    if (this.state.isSideDrawerOpen) {
      Animated.parallel([this.backToBurger(), this.slideInContent()]).start(
        () =>
          this.setState(prevState => ({
            isSideDrawerOpen: !prevState.isSideDrawerOpen
          }))
      );
    } else {
      Animated.parallel([this.burgerToBack(), this.slideOutContent()]).start(
        () =>
          this.setState(prevState => ({
            isSideDrawerOpen: !prevState.isSideDrawerOpen
          }))
      );
    }
  };

  render() {
    const contentStyle = {
      left: this.slideContent.interpolate({
        inputRange: [0, 1],
        outputRange: [0, WIDTH * 0.7]
      })
    };

    const burgerStyle = {
      topBar: {
        transform: [
          {
            rotate: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "-45deg"]
            })
          }
        ],
        width: this.transformBurger.interpolate({
          inputRange: [0, 1],
          outputRange: [40, 20]
        })
      },
      bottomBar: {
        transform: [
          {
            rotate: this.transformBurger.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "45deg"]
            })
          }
        ],
        width: this.transformBurger.interpolate({
          inputRange: [0, 1],
          outputRange: [40, 20]
        })
      }
    };
    return (
      <View>
        <ImageBackground
          source={background}
          style={{ width: "100%", height: "100%" }}
        >
          <LinearGradient
            colors={["#000", "transparent", "#000"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
          />

          <AnimatedContentWrapper style={contentStyle}>
            <ScrollView
              scrollEventThrottle={16}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { y: this.scroll } } }
              ])}
            >
              <ScrollViewContent>{this.props.children}</ScrollViewContent>
            </ScrollView>
            <Header
              scrollY={this.scroll}
              onPress={this.onBurgerPressHandler}
            />

            <Burger onPress={this.onBurgerPressHandler}>
              <AnimatedBar style={burgerStyle.topBar} />
              <Bar />
              <AnimatedBar style={burgerStyle.bottomBar} />
            </Burger>
            <SideDrawer />
          </AnimatedContentWrapper>
        </ImageBackground>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   isSideDrawerOpen: state.ui.isSideDrawerOpen
// });

// const mapDispatchToProps = dispatch => ({
//   onOpenSideDrawer: () => dispatch(openSideDrawer()),
//   onCloseSideDrawer: () => dispatch(closeSideDrawer())
// });

// export default withNavigation(connect(mapStateToProps)(Layout));

export default Layout;

const View = styled.View`
  flex: 1;
`;

const ImageBackground = styled.ImageBackground`
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
  width: ${WIDTH};
  /* border: 1px solid yellow; */
`;

const ScrollViewContent = styled.ScrollView`
  margin-top: ${HEADER_MAX_HEIGHT};
`;

const ContentWrapper = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  /* left: 0; */
  height: 100%;
`;
const AnimatedContentWrapper = Animated.createAnimatedComponent(ContentWrapper);

const Burger = styled.TouchableOpacity`
  position: absolute;
  top: ${HEADER_MIN_HEIGHT / 2 - 20};
  left: 10;
  height: 40;
  width: 40;
  /* border: 1px solid red; */

  justify-content: space-around;
`;

const Bar = styled.View`
  width: 40;
  height: 5;
  background-color: white;
  border-radius: 5;
`;

const AnimatedBar = Animated.createAnimatedComponent(Bar);
