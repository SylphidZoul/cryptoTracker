import React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import CoinsStack from 'cryptoTracker/src/components/coins/CoinsStack'
import FavouritesStack from 'cryptoTracker/src/components/favourites/FavouritesStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Colors from 'cryptoTracker/src/res/colors'
import Bank from 'cryptoTracker/src/assets/bank.png'
import Star from 'cryptoTracker/src/assets/star.png'

const Tabs = createBottomTabNavigator()

const tabOptions = (img) => {
  return {
    tabBarIcon: ({ size, color }) => (
      <Image 
        style={{ tintColor: color, width: size, height: size }}
        source={img}
      />
    )
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: Colors.blackPearl
          }
        }}
      >
        <Tabs.Screen 
          name='Coins'
          component={CoinsStack}
          options={() => tabOptions(Bank)}
        />
        <Tabs.Screen 
          name='Favourites'
          component={FavouritesStack}
          options={() => tabOptions(Star)}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  )
}

export default App;
