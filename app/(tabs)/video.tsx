import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';

// List of candies with names, descriptions, and image URLs
const candies = [
  { name: 'Chocolate Bar', description: 'Sweet, rich, and full of flavor.', image: 'https://wallpapers.com/images/hd/stacked-milk-chocolate-bars-5zl1liqq2l6r8jin.jpg' },
  { name: 'Gummy Bears', description: 'Colorful, chewy, and fun to eat.', image: 'https://static.vecteezy.com/system/resources/previews/036/568/550/non_2x/ai-generated-gummy-bear-on-transparent-background-free-png.png' },
  { name: 'Lollipop', description: 'Hard candy on a stick, great for a long-lasting treat.', image: 'https://smartsweets.com/cdn/shop/files/Lollipop_US_Pink_02_b80e00e8-e023-4481-ae05-f3af1dbd1c08.png?v=1668438476&width=300' },
  { name: 'Candy Cane', description: 'Minty and refreshing, perfect for holidays.', image: 'https://static.vecteezy.com/system/resources/previews/013/720/923/non_2x/christmas-candy-cane-free-png.png' },
  { name: 'Jelly Beans', description: 'Tiny, fruity, and a burst of flavor.', image: 'https://inroomplus.com/cdn/shop/products/jellybelly_grande.jpg?v=1665689583' },
];

const CandyQuizScreen = () => {
  const [name, setName] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [favoriteFlavor, setFavoriteFlavor] = useState('');
  const [favoriteSeason, setFavoriteSeason] = useState('');
  const [favoriteAnimal, setFavoriteAnimal] = useState('');
  const [favoriteHobby, setFavoriteHobby] = useState('');
  const [favoriteMovieGenre, setFavoriteMovieGenre] = useState('');
  const [candyResult, setCandyResult] = useState(null);

  const handleSubmit = () => {
    if (!name || !favoriteColor || !favoriteFlavor || !favoriteSeason || !favoriteHobby || !favoriteMovieGenre) {
      Alert.alert('Incomplete Information', 'Please fill out all the fields before finding out your candy type.');
      return;
    }
    // Randomly select a candy
    const randomCandy = candies[Math.floor(Math.random() * candies.length)];
    setCandyResult(randomCandy);

    // Clear all input fields
    setName('');
    setFavoriteColor('');
    setFavoriteFlavor('');
    setFavoriteSeason('');
    setFavoriteAnimal('');
    setFavoriteHobby('');
    setFavoriteMovieGenre('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>What Type of Candy Are You?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="What's your favorite color?"
        placeholderTextColor="#888"
        value={favoriteColor}
        onChangeText={setFavoriteColor}
      />
      <TextInput
        style={styles.input}
        placeholder="What's your favorite flavor?"
        placeholderTextColor="#888"
        value={favoriteFlavor}
        onChangeText={setFavoriteFlavor}
      />
      <TextInput
        style={styles.input}
        placeholder="What's your favorite season?"
        placeholderTextColor="#888"
        value={favoriteSeason}
        onChangeText={setFavoriteSeason}
      />
      
      <TextInput
        style={styles.input}
        placeholder="What's your favorite hobby?"
        placeholderTextColor="#888"
        value={favoriteHobby}
        onChangeText={setFavoriteHobby}
      />
      <TextInput
        style={styles.input}
        placeholder="What's your favorite movie genre?"
        placeholderTextColor="#888"
        value={favoriteMovieGenre}
        onChangeText={setFavoriteMovieGenre}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Find Out!</Text>
      </TouchableOpacity>
      {candyResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>You are a {candyResult.name}!</Text>
          <Text style={styles.resultDescription}>{candyResult.description}</Text>
          <Image source={{ uri: candyResult.image }} style={styles.image} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#222',
    color: '#fff',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  resultDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default CandyQuizScreen;
