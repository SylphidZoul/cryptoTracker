import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FavouritesScreen from './FavouritesScreen'
import CoinDetailScreen from 'cryptoTracker/src/components/coinDetail/CoinDetailScreen'
import Colors from 'cryptoTracker/src/res/colors'

const Stack = createStackNavigator()

const FavouritesStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.blackPearl,
        shadowColor: Colors.blackPearl
      },
      headerTintColor: Colors.white
    }}>
      <Stack.Screen name='Favourites' component={FavouritesScreen} />
      <Stack.Screen name='CoinDetail' component={CoinDetailScreen} />
    </Stack.Navigator>
  )
}

export default FavouritesStack
