import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'

import ListNavigator from './ListNavigator';
import MapScreen from './MapScreen';
import HelpScreen from './HelpScreen';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator } from 'react-navigation-tabs';

import { Feather } from '@expo/vector-icons';


const TabNavigator = createBottomTabNavigator({
    
    List: {
        screen: ListNavigator, 
        navigationOptions: {
            tabBarLabel: 'List View', 
            tabBarIcon: ({ tintColor }) => (
                <Feather name="list" color={tintColor} size={25} />
            ),
        },
    }, 
    Map: {
        screen: MapScreen, 
        navigationOptions: {
            tabBarLabel: 'Map View', 
            tabBarIcon: ({ tintColor }) => (
                <Feather name='map' color={tintColor} size={25} />
            )
        }
    }, 
    Signout: {
        screen: HelpScreen, 
        navigationOptions: {
            tabBarLabel: 'Help', 
            tabBarIcon: ({ tintColor }) => (
                <Feather name="help-circle" color={tintColor} size={25} />
            )
        }
    }
},
{
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        activeTintColor: "#9a73ef" , 
        inactiveTintColor: 'grey'
    }
},
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })

export default createAppContainer(TabNavigator);