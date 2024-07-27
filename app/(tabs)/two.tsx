import React from 'react';
import { StyleSheet, FlatList, Image, Dimensions } from 'react-native';;
import { Asset } from 'expo-asset';
import { View } from 'react-native';

const { width, height } = Dimensions.get('window');

const images = [
  Asset.fromModule(require('../assets/2.jpeg')),
  Asset.fromModule(require('../assets/3.jpeg')),
  Asset.fromModule(require('../assets/4.jpeg')),
  Asset.fromModule(require('../assets/5.jpeg')),
  Asset.fromModule(require('../assets/6.jpeg')),
  Asset.fromModule(require('../assets/7.jpeg')),
  Asset.fromModule(require('../assets/8.jpeg')),
  Asset.fromModule(require('../assets/9.jpeg')),
  Asset.fromModule(require('../assets/10.jpeg')),
  Asset.fromModule(require('../assets/11.jpeg')),
  Asset.fromModule(require('../assets/1.jpeg')),
  // Add more images as needed
];

export default function TabTwoScreen() {
  return (
    <View style={styles.container2}>
      <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  container2: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  image: {
    width: width * 0.9,
    height: height * 0.7,
    margin: 10,
    resizeMode: 'contain',
  },
});
