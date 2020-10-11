import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const FavouritesEmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You don't have any favourites yet.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center'
  }
})

export default FavouritesEmptyState