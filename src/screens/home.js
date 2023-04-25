import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
// import AppLoading from 'expo-app-loading'
import * as SplashScreen from 'expo-splash-screen'

import Layout from '../components/Layout'
import FlatList from '../components/FlatList'

import { fetchWallpapers } from '../store/actions/index'
import { loadAssetsAsync } from '../store/actions/index'

class Home extends React.Component {
  state = {
    isAppReady: false,
  }
  componentDidMount() {
    this.props.onFetchWallpapers()

    loadAssetsAsync()
      .then(() => {
        this.setState({ isAppReady: true })
        SplashScreen.hideAsync()
      })
      .catch((err) => console.log(err))
  }

  render() {
    return this.state.isAppReady ? (
      <Layout title='SKULL WALLPAPERS'>
        <FlatList title='New' data={this.props.wallpapers} horizontal={true} />
        <FlatList title='Explore' data={this.props.wallpapers} />
      </Layout>
    ) : null
  }
}

const mapStateToProps = (state) => {
  return {
    wallpapers: state.wallpapers.wallpapers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchWallpapers: () => dispatch(fetchWallpapers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const View = styled.View`
  flex: 1;
`
