import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';

import  MapView from 'react-native-maps'
import Marker from 'react-native-maps'


import { connect } from 'react-redux';


function mapStateToProps(state) {
  return {
    data: state.myData,
    userLat: state.userLat,
    userLong: state.userLong
  };
}

export default connect(mapStateToProps)(MapScreen);

function MapScreen(props){


  mapMarkers = () => {
    return props.data.map((marker,index) => <MapView.Marker
      key={index}
      coordinate={{ latitude: marker.lat, longitude: marker.lng }}
      title={marker.name}
      description={marker.address}
      pinColor = {marker.lgbtqowned == '1' ? 'green' : 'red' }
    />
    )
  }
    
    return (
      
      <MapView style = {styles.container}
      initialRegion={{
        latitude: 38.9072,
        longitude: -77.03,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {this.mapMarkers()}
    </MapView>
    
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

