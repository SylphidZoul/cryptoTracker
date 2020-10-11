import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import Http from 'cryptoTracker/src/libs/http'
import CoinsItems from './CoinsItem'
import CoinSearch from './CoinSearch'
import Colors from 'cryptoTracker/src/res/colors'

const CoinsScreen = ({ navigation }) => {
  const [ coins, setCoins ] = useState([])
  const [ coinsBackup, setCoinsBackup ] = useState([])
  const [ loading, setLoading ] = useState(false)

  const handlePress = (coin) => {
    navigation.navigate('CoinDetail', {coin})
  }

  const handleSearch = (query) => {
    const coinsFiltered = coinsBackup.filter((coin) => {
      return coin.name.toLowerCase().includes(query.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(query.toLowerCase())
    })

    setCoins(coinsFiltered)
  }

  const getCoins = async () => {
    setLoading(true)
    const res = await Http.instance.get('https://api.coinlore.net/api/tickers/')
    setCoins(res.data)
    setCoinsBackup(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getCoins()
  }, [])

  return (
    <View style={Styles.container}>
      <CoinSearch onChange={handleSearch} />
      { loading &&
        <ActivityIndicator
          color='#FFF'
          size='large'
          style={Styles.loader}
          />
      }
      <FlatList
        data={coins}
        renderItem={({ item }) =>
          <CoinsItems
            item={item}
            onPress={() => handlePress(item)}
          />}  
      />
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  loader: {
    marginTop: 60
  }
})

export default CoinsScreen