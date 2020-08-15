import React, {Component} from 'react';  
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator } from 'react-navigation-tabs';

import {View, StyleSheet, Text} from 'react-native'

import MinorityList from "./MinorityList";  
import LGBTQList from "./LGBTQList";   

export default class ListNavigator extends Component{

    render()
    {
        return(
            <>
                <View style = {styles.offset}></View>
                <TopTab style = {styles.container}/>
            </>
        )
    }
}
  
const AppNavigator = createMaterialTopTabNavigator({   
        
    Minority: {
        screen: MinorityList, 
        navigationOptions: {
            tabBarLabel: 'Minority-Owned', 
        }
    }, 
    LGBTQ: {
        screen: LGBTQList, 
        navigationOptions: {
            tabBarLabel: 'LGBTQ-Owned', 
        }
    }
},  
{  
    tabBarOptions: {  
        activeTintColor: 'white',  
        showIcon: false,  
        showLabel:true,  
        style: {  
            backgroundColor: "#9a73ef"  
        },

    },  
}  
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    offset: {
        height: 38,
        backgroundColor: "#9a73ef"
    }
  })

const TopTab = createAppContainer(AppNavigator);
