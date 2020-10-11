import React, {useState, useEffect} from 'react'
import { View, Text, Image, SectionList, FlatList, StyleSheet, Pressable, Alert } from 'react-native'
import Colors from 'cryptoTracker/src/res/colors'
import Http from 'cryptoTracker/src/libs/http'
import CoinMarketItem from './CoinMarketItem'
import Storage from 'cryptoTracker/src/libs/storage'

const CoinDetailScreen = (props) => {
  const [ coin, setCoin ] = useState({})
  const [ market, setMarket ] = useState([])
  const [ isFavourite, setIsFavourite ] = useState(false)

  const toggleFavourite = () => {
    if(isFavourite) {
      removeFavourite()
    } else {
      addFavourite()
    }
  }

  const addFavourite = async () => {
    const Coin = JSON.stringify(coin)
    const key = `favourite-${coin.id}`

    const stored = await Storage.instance.store(key, Coin)

    console.log('stored', stored)

    if (stored) {
      setIsFavourite(true)
    }
  }

  const removeFavourite = () => {
    Alert.alert('Remove favourite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favourite-${coin.id}`
          const removed = await Storage.instance.remove(key)
      
          console.log('removed', removed)
          if(removed) setIsFavourite(false)
        },
        style: 'destructive'
      }
    ])
  }

  const GetFavourite = async () => {
    const key = `favourite-${coin.id}`

    try {
      const favourite = await Storage.instance.get(key)
      
      if(favourite){
        setIsFavourite(true)
      } else {
        setIsFavourite(false)
      }

    } catch (error) {
      console.log('getError', error)
    }
  }

  const getSymbolIcon = (name) => {

    if(name) {
      const symbol = name.toLowerCase().replace(" ", "-")
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`
    }
  }

  const getSections = (coin) => {
    const sections = [
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd]
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24]
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h]
      }
    ]

    return sections
  }

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
    const markets = await Http.instance.get(url)
    
    setMarket(markets)
  }

  useEffect(() => {
    setCoin(props.route.params.coin)
    props.navigation.setOptions({ title: coin.symbol })
    getMarkets(props.route.params.coin.id)
  }, [])
  
  useEffect(() => {
    GetFavourite()
  }, [coin])

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>

        <View style={styles.row}>
          <Image
            style={styles.iconImage}
            source={{ uri: getSymbolIcon(coin.name)}}
          />
          <Text style={styles.titleText}>
            {coin.name}
          </Text>
        </View>

        <Pressable
          onPress={toggleFavourite}
          style={[
            styles.btnFavourite,
            isFavourite
              ? styles.btnFavouriteRemove
              : styles.btnFavouriteAdd
        ]}>
          <Text style={styles.btnFavouriteText}>
            {isFavourite ? 'Remove favourite' : 'Add favourite'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={( item ) => item}
        renderSectionHeader={({ section }) =>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        }
        renderItem={({ item }) =>
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>
              {item}
            </Text>
          </View>
        }
      />

      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList
        style={styles.list}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={market}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  titleText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 8
  },
  iconImage: {
    width: 25,
    height: 25
  },
  section: {
    maxHeight: 220
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16
  },
  btnFavourite: {
    padding: 8,
    borderRadius: 8
  },
  btnFavouriteText: {
    color: Colors.white
  },
  btnFavouriteAdd: {
    backgroundColor: Colors.picton
  },
  btnFavouriteRemove: {
    backgroundColor: Colors.carmine
  }
})

export default CoinDetailScreen