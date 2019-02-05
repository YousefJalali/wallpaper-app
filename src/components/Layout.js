import React from "react";
import { Dimensions, Animated, Easing } from "react-native";
import { withNavigation } from "react-navigation";
import styled from "styled-components/native";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { openSideDrawer, closeSideDrawer } from "../store/actions/index";

import background from "../assets/hero.jpg";
import Header from "../components/Header";
import SideDrawer from "../components/SideDrawer";
import BurgerMenu from "../components/BurgerMenu";
import SwipeToOpenSD from "../components/SwipeToOpenSD";

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
    Animated.spring(this.slideContent, {
      toValue: 1,
      bounciness: 10
    });
  slideInContent = () => {
    this.slideContent.setValue(1);
    return Animated.spring(this.slideContent, {
      toValue: 0,
      bounciness: 10
    });
  };

  //turn burger icon to back icon
  burgerToBack = () =>
    Animated.spring(this.transformBurger, {
      toValue: 1,
      // bounciness: 10
    });
  backToBurger = () => {
    this.transformBurger.setValue(1);
    return Animated.spring(this.transformBurger, {
      toValue: 0,
      // bounciness: 10
    });
  };

  toggleSideDrawerHandler = () => {
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

  //side drawer nav
  onLinkPressHandler = route => {
    this.toggleSideDrawerHandler();

    switch (route) {
      case "Home":
        return this.props.navigation.navigate("Home");
      case "Favorite":
        return this.props.navigation.navigate("Favorite");
      case "About":
        return this.props.navigation.navigate("About");
      default:
        props.navigation.navigate("Home");
    }
  };

  render() {
    const contentStyle = {
      right: this.slideContent.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -WIDTH * 0.7]
      })
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
          <SwipeToOpenSD toggleSideDrawer={this.toggleSideDrawerHandler}>
            <AnimatedContentWrapper style={contentStyle}>
              <SideDrawer linkTo={this.onLinkPressHandler} />
              <Container>
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
                  onPress={this.toggleSideDrawerHandler}
                  title={this.props.title}
                />

                <BurgerMenu
                  onPress={this.toggleSideDrawerHandler}
                  transformBurger={this.transformBurger}
                />
              </Container>
            </AnimatedContentWrapper>
          </SwipeToOpenSD>
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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Layout);

export default withNavigation(Layout);

const View = styled.View`
  flex: 1;
  position: relative;
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

const Container = styled.View`
  position: relative;
  width: ${WIDTH};
  border: 1px solid blue;
`;

const ContentWrapper = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  right: 0;
  width: ${WIDTH * 1.7};
  height: 100%;
  border: 1px solid red;

  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const AnimatedContentWrapper = Animated.createAnimatedComponent(ContentWrapper);
