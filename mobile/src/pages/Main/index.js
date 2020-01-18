import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../services/api';

export default function Main({ navigation }) {

  const [ devs, setDevs ] = useState([]);
  const [ currentRegion, setCurrentRegion ] = useState(null);
  const [ techs, setTechs ] = useState('');

  useEffect(() => {
    async function loadInitialLocation(){
      const {granted} = await requestPermissionsAsync();

      if(granted){
        const {coords} = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        })
      } 
    }

    loadInitialLocation();
  }, []);

  async function loadDevs () {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude, 
        longitude,
        techs
      }
    });

    setDevs(response.data.devs);
  }

  async function handleRegionChanged (region) {
    setCurrentRegion(region)
  }

  if(!currentRegion){
    return null;
  }

  return (
   <>
     <MapView 
      style={styles.map}
      initialRegion={currentRegion}
      onRegionChangeComplete={handleRegionChanged} 
    >
      {devs.map(dev => (
        <Marker
          key={dev._id}
          coordinate={{
            longitude: dev.location.coordinates[0],
            latitude: dev.location.coordinates[1],
          }}
        >
          <Image 
            source={{ uri: dev.avatar_url }}
            style={styles.avatar}
          />
          <Callout onPress={() => {
            navigation.navigate('Profile', { github_username: dev.github_username })
          }}>
            <View style={styles.callout}>
              <Text style={styles.devName}>{dev.name}</Text>
              <Text style={styles.devBio}>{dev.bio}</Text>
              <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
            </View>
          </Callout>
      </Marker>
      ))}
    </MapView>

    <View style={styles.searchForm}>
      <TextInput 
        style={styles.searchInput}
        placeholder="Buscar devs por techs..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={techs}
        onChangeText={setTechs}
      />
      <TouchableOpacity 
        style={styles.loadButton}
        onPress={loadDevs}
      >
        <MaterialIcons
          name="my-location"
          size={20}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
   </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 260
  },

  devName: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  devBio: {
    color: '#666',
    marginTop: 5
  },

  devTechs: {
    marginTop: 5
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 20,
    flexDirection: 'row'
  },

  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 4, height: 5} 
  },

  loadButton: {
    width: 50,
    height: 50,
    marginLeft: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8E4DFF',
    
  }

})
