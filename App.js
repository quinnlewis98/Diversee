import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View , SafeAreaView} from 'react-native';
import * as firebaseApp from 'firebase';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import TabNavigator from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyBY9suKYAHsZ5xN1r3kIkxxfFkR5EcQtLM");

var firebaseConfig = {
  apiKey: "AIzaSyB1qWL4SxBg7sLgtEMQZDr3uf5-b_1nAhM",
  authDomain: "diversee.firebaseapp.com",
  databaseURL: "https://diversee.firebaseio.com",
  projectId: "diversee",
  storageBucket: "diversee.appspot.com",
  messagingSenderId: "615664621595",
  appId: "1:615664621595:web:d1bc0f123e78768c4900be",
  measurementId: "G-R3EQCTX4GC"
};

// Initialize Firebase
if (firebaseApp.apps.length == 0) {
  firebaseApp.initializeApp(firebaseConfig);
}


const initialState ={
  myData: [],
  userLat: 38.9072,
  userLong: -77.02877,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
      case 'DATA':
        return {...state, myData: action.data};
      case 'LOCATION':
        return  {...state, userLat: action.lat, userLong: action.long};
    }
}

const store = createStore(reducer, applyMiddleware(thunk));


export default function App() {

  const [loading, setLoading] = React.useState(true);
  const [resData, setResData] = React.useState([]);
  const [error, setError] = React.useState('')

  findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

				this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}


  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        setError('Permission to access location was denied')
    }

    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    const { latitude , longitude } = location.coords
    store.dispatch({
      type: 'LOCATION',
      lat: latitude,
      long: longitude
  });
    setLoading(false);
  };




  function recieveData() {
    firebaseApp
      .database()
      .ref('/')
      .on('value', (snapshot) => {
        setResData(snapshot.val())
        store.dispatch({
          type: 'DATA',
          data: snapshot.val()
      });
    }); 
  }

  useEffect(() => {
    recieveData();
    this.getLocationAsync();   
  }, []);


  if(loading ==true){ 
    return <LoadingScreen/>
  }
  else {
    return (
    <Provider store = {store}>
      <TabNavigator />
    </Provider>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offset:{
    marginTop: 30
  }
});
