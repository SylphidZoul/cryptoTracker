import React, {useState, useEffect} from 'react'
import { TextInput, Platform, View, StyleSheet } from 'react-native'
import Colors from 'cryptoTracker/src/res/colors'

const CoinSearch = ({ onChange }) => {
  const [ query, setQuery ] = useState('')

  const handleText = (query) => {
    setQuery(query)
  }

  useEffect(() => {
    onChange(query)
  }, [query])

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS == 'ios'
            ? styles.textInputIOS
            : styles.textInputAndroid
        ]}
        onChangeText={handleText}
        value={query}
        placeholder='Search Coin'
        placeholderTextColor='#fff'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: '#fff'
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8
  }
})

export default CoinSearch