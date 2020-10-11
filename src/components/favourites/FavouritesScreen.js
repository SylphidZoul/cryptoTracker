import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import FavouriteEmptyState from './FavouritesEmptyState'
import CoinsItem from 'cryptoTracker/src/components/coins/CoinsItem'
import Storage from 'cryptoTracker/src/libs/storage'
import Colors from 'cryptoTracker/src/res/colors'

const FavouritesScreen = ({ navigation }) => {
  const [ favourites, setFavourites ] = useState([])

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail', {coin})
  }

  const getFavourites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys()
      const keys = allKeys.filter(key => key.includes('favourite-'))
      const favStr = await Storage.instance.multiGet(keys)
      const favs = favStr.map(fav => JSON.parse(fav[1]))

      setFavourites(favs)

    } catch (error) {
      console.log('getFavs error', error)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getFavourites)

    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      {
        favourites.length === 0
          ? <FavouriteEmptyState />
          : <FlatList
              data={favourites}
              renderItem={({ item }) =>
                <CoinsItem
                  item={item}
                  onPress={() => handlePress(item)}
                /> }
          />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1
  }
})

export default FavouritesScreen