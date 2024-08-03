import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import Slider from '@react-native-community/slider';
import { FontAwesome } from '@expo/vector-icons';

const song1 = Asset.fromModule(require('../assets/candyIntroSong.mp3'));
const song2 = Asset.fromModule(require('../assets/happySongNisha.mp3'));
const song3 = Asset.fromModule(require('../assets/momSong.mp3'));
const song4 = Asset.fromModule(require('../assets/crySong.mp3'));
const song5 = Asset.fromModule(require('../assets/newYorkVibes.mp3'));
const song6 = Asset.fromModule(require('../assets/subtleSamples.mp3'));
const song7 = Asset.fromModule(require('../assets/suspenseSamples.mp3')); // Update with the correct file if different
const img1 = Asset.fromModule(require('../assets/candyMovie.png'));
const img2 = Asset.fromModule(require('../assets/candyMovie.png'));

const songs = [
  { id: '1', title: 'Candy Intro', file: song1, artwork: img1}, // Add artwork
  { id: '2', title: 'Happy Vibes', file: song2, artwork: img2 }, // Add artwork
  { id: '3', title: 'Mom Searching', file: song3, artwork: img1}, // Add artwork
  { id: '4', title: 'Crying for Eternity', file: song4, artwork: img2 }, // Add artwork
  { id: '5', title: 'New York Vibes', file: song5, artwork: img1}, // Add artwork
  { id: '6', title: 'Subtle Samples', file: song6, artwork: img2 }, // Add artwork
  { id: '7', title: 'Suspense Samples', file: song7, artwork: img2 }, // Add artwork
];

const Mp3Player = () => {
  const [sound, setSound] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });

    if (sound) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const playPauseSound = async (file) => {
    try {
      if (sound && currentSong === file) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
      } else {
        if (sound) {
          await sound.unloadAsync();
        }
        const { sound: newSound } = await Audio.Sound.createAsync(file);
        setSound(newSound);
        setCurrentSong(file);
        setIsPlaying(true);
        await newSound.playAsync();
      }
    } catch (error) {
      console.error('Error in playPauseSound:', error);
    }
  };

  const downloadSong = async (file, title) => {
    const fileUri = FileSystem.documentDirectory + title + '.mp3';
    try {
      const asset = await FileSystem.downloadAsync(file.uri, fileUri);
      alert('Downloaded to: ' + asset.uri);
    } catch (error) {
      alert('Download failed');
    }
  };

  const handleSliderValueChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Candy Player</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songContainer}>
            <Image source={item.artwork} style={styles.artwork} />
            <View style={styles.infoContainer}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => playPauseSound(item.file)}
                >
                  <FontAwesome name={isPlaying && currentSong === item.file ? "pause" : "play"} size={24} color="#fff" />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => downloadSong(item.file, item.title)}
                >
                  <FontAwesome name="download" size={24} color="#fff" />
                </TouchableOpacity> */}
              </View>
              {currentSong === item.file && (
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={duration}
                  value={position}
                  onValueChange={handleSliderValueChange}
                  minimumTrackTintColor="#1EB1FC"
                  maximumTrackTintColor="#1EB1FC"
                  thumbTintColor="#1EB1FC"
                />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: '20%'
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#1EB1FC',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  slider: {
    width: Dimensions.get('window').width - 140, // Adjusted for artwork and padding
    height: 40,
  },
});

export default Mp3Player;
