import React, { Component } from 'react';
import { StyleSheet, View, Image, Text , ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return(
      <View style={styles.container}>
        <LinearGradient
          colors={['#ccb8f7', "#9a73ef" , '#682ee7']} style = {styles.container}>
          <Text style= {styles.title}> Diversee </Text>
          <ActivityIndicator size="large" color= "#fff" />
        </LinearGradient> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  title:{
    fontSize :56,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#ffffff'
},
})