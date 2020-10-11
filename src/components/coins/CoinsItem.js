import React from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import Colors from 'cryptoTracker/src/res/colors'

const CoinsItem = ({ item, onPress }) => {
  const getImageArrow = () => {
    if(item.percent_change_1h > 0) {
      return require('cryptoTracker/src/assets/arrow_up.png')
    } else {
      return require('cryptoTracker/src/assets/arrow_down.png')
    }
  }

  return (
    <Pressable onPress={onPress} style={Styles.container}>
      <View style={Styles.row}>
        <Text style={Styles.symbolText}>{item.symbol}</Text>
        <Text style={Styles.nameText}>{item.name}</Text>
        <Text style={Styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={Styles.row}>
        <Text style={Styles.percentText}>{item.percent_change_1h}</Text>
        <Image 
          source={getImageArrow()}
          style={Styles.imgIcon}
        />
      </View>
    </Pressable>
  )
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.zircon,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row'
  },
  symbolText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12
  },
  nameText: {
    color: Colors.white,
    fontSize: 14,
    marginRight: 16
  },
  priceText: {
    color: Colors.white,
    fontSize: 14
  },
  percentText: {
    color: Colors.white,
    fontSize: 12,
    marginRight: 8
  },
  imgIcon: {
    width: 22,
    height: 22
  }
})

export default CoinsItem