import React from 'react'
import { Dimensions, Platform } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons'
import logo from '../assets/logo.png'

const WIDTH = Dimensions.get('window').width

export default function SideDrawer(props) {
  let platform = 'md'
  if (Platform.OS === 'ios') {
    platform = 'ios'
  }

  return (
    <Container>
      <LinearGradient
        start={[0, 0.5]}
        end={[1, 0.5]}
        colors={['#000', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />

      <Menu>
        <Logo source={logo} style={{ resizeMode: 'stretch' }} />
        <TouchableOpacity onPress={() => props.linkTo('Home')}>
          <Ionicons name={`${platform}-images`} size={20} color='white' />
          <MenuItem>wallpapers</MenuItem>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.linkTo('Favorite')}>
          <Ionicons
            name={`${platform}-heart-outline`}
            size={20}
            color='white'
          />
          <MenuItem>favorite</MenuItem>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.linkTo('About')}>
          <Ionicons
            name={`${platform}-information-circle-outline`}
            size={20}
            color='white'
          />
          <MenuItem>about</MenuItem>
        </TouchableOpacity>
      </Menu>
    </Container>
  )
}

// const mapStateToProps = state => ({
//   isSideDrawerOpen: state.ui.isSideDrawerOpen
// });

// const mapDispatchToProps = dispatch => ({
//   onCloseSideDrawer: () => dispatch(closeSideDrawer())
// });

// export default connect(
//   null,
//   mapDispatchToProps
// )(SideDrawer);

const Container = styled.View`
  width: ${WIDTH * 0.7}px;
  background-color: transparent;
`

const Menu = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-left: 10px;
  justify-content: flex-start;
  align-items: flex-start;
`

const Logo = styled.Image`
  width: 150px;
  height: 193px;
  margin-bottom: 50px;
  align-self: center;
`

const TouchableOpacity = styled.TouchableOpacity`
  padding-bottom: 20px;
  padding-left: 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const MenuItem = styled.Text`
  font-family: 'Raleway-bold';
  font-size: 20px;
  color: white;
  padding-left: 10px;
`
