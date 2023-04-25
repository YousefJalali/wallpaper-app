import React from 'react'
import styled from 'styled-components/native'

export default function Card(props) {
  return (
    <Container
      onPress={props.onPress}
      width={props.width}
      height={props.height}
    >
      <Image
        source={{ uri: props.url, cache: 'default' }}
        style={{ resizeMode: 'cover' }}
      />
    </Container>
  )
}

const Container = styled.TouchableOpacity`
  width: ${(props) => (props.width ? `${props.width}%` : 0)};
  padding-top: ${(props) => (props.width ? `${(16 * props.width) / 9}%` : 0)};

  height: ${(props) => (props.height ? props.height : 0)}px;
  padding-left: ${(props) =>
    props.height ? `${(9 * props.height) / 16}px` : 0};

  overflow: hidden;
`

const Image = styled.Image`
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  border-radius: 10px;
`
