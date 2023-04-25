import React from 'react'
import styled from 'styled-components/native'
import Ionicons from '@expo/vector-icons/Ionicons'

import Layout from '../components/Layout'

export default class About extends React.Component {
  render() {
    return (
      <Layout title='ABOUT'>
        <ScrollView>
          <Text>
            Made with&nbsp;
            <Ionicons name='ios-heart' size={16} color='#f73859' /> from a Skull
            Art lover. All these beautiful wallpapers are gathered from
            different sources so you can style your phone with it. We are going
            to add more wallpapers weekly. If you like this app please
          </Text>
          <Button>
            <Title>RATE THIS APP</Title>
          </Button>
          <Text>
            If you have any suggestion to improve this app please leave a
            comment. Looking forward to your feedback.
          </Text>
          <Title>CREDITS</Title>
          <Text>Background vector created by Freepik</Text>
          <Link>https://www.freepik.com/free-photos-vectors/background</Link>
        </ScrollView>
      </Layout>
    )
  }
}

const ScrollView = styled.ScrollView`
  flex: 1;
  padding-right: 10px;
  padding-left: 10px;
`

const Button = styled.TouchableOpacity`
  background-color: #f73859;
  width: 50%;
  align-self: center;
  padding-top: 5px;
  padding-bottom: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const Text = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`

const Title = styled.Text`
  margin-top: 10px;
  color: white;
  font-size: 16px;
  font-weight: 800;
  text-align: center;
`

const Link = styled.Text`
  color: white;
  font-size: 14px;
  font-style: italic;
  text-align: center;
`
