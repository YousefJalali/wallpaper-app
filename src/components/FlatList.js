import React from 'react'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import Card from './Card'

class FlatListComponent extends React.Component {
  _renderItem = ({ item }, height, width) => {
    return (
      <Card
        onPress={(e) =>
          this.onCardPressHandler(e, item.id, item.url, height, width)
        }
        // url={item.url}
        url={item.url}
        width={width}
        height={height}
      />
    )
  }

  onCardPressHandler = (e, id, url, height, width) => {
    const screenWidth = Dimensions.get('window').width

    let cardWidth = width
    let cardHeight = height

    if (height !== null) {
      cardHeight = height - 10
      cardWidth = (9 * height) / 16 - 10
    }

    if (width !== null) {
      cardWidth = (screenWidth - 30) / 2
      cardHeight = (16 * (screenWidth - 20)) / 2 / 9
    }

    const coordinates = {
      top: e.nativeEvent.pageY - e.nativeEvent.locationY,
      left: e.nativeEvent.pageX - e.nativeEvent.locationX,
      height: cardHeight,
      width: cardWidth,
    }

    this.props.navigation.navigate('Details', {
      id,
      coordinates,
      url,
    })
  }

  render() {
    return (
      <>
        <Title>{this.props.title}</Title>
        {this.props.horizontal ? (
          <FlatList
            data={this.props.data}
            height={180}
            horizontal={true}
            renderItem={({ item }) => this._renderItem({ item }, 180, null)}
            keyExtractor={(item) => `'' + ${item.id}`}
          />
        ) : (
          <FlatList
            data={this.props.data}
            numColumns={2}
            renderItem={({ item }) => this._renderItem({ item }, null, 50)}
            keyExtractor={(item) => `'' + ${item.id}`}
          />
        )}
      </>
    )
  }
}

export default function (props) {
  const navigation = useNavigation()

  return <FlatListComponent {...props} navigation={navigation} />
}

// export default withNavigation(FlatListComponent)

const Title = styled.Text`
  font-family: 'Raleway-black';
  font-size: 20px;
  color: #fff;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  text-align: left;
`

const FlatList = styled.FlatList`
  flex: 1;
  padding-right: 5px;
  padding-left: 5px;
  height: ${(props) =>
    props.horizontal ? `${props.height}px` || '180px' : '100%'};
  margin-bottom: 24px;
`
