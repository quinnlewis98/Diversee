import React, {Component} from 'react';  
import {View,Text, StyleSheet, FlatList, Linking,Platform,} from 'react-native'; 


import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';

import {getDistance} from 'geolib';


//import Accordion from 'react-native-collapsible/Accordion';


const tintColor = "#484049"



function mapStateToProps(state) {
    return {
      minorityData: state.myData.filter(item => item.minorityowned == 1),
      userLat: state.userLat,
      userLong: state.userLong
    };
  }

export default connect(mapStateToProps)(MinorityList);



function MinorityList(props){ 
    
    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `tel:${number}`; }
        console.log(phoneNumber)
        Linking.openURL(phoneNumber);
    };

    toMap = (address) => {
        Linking.openURL(`http://maps.apple.com/maps?daddr=${address}`);
    };

    renderNativeItem = (item) => {
        const itemDist = getDistance({ //get distance between plaza and current location
            latitude: item.lat,
            longitude:  item.lng
         }, {
                 latitude: props.userLat,
                 longitude: props.userLong,
             })/1000
        return (
            <View>
                <Collapse style={{borderBottomWidth:1,borderTopWidth:1}}>
                    <CollapseHeader style={{flexDirection:'row', alignContent:'center', paddingTop: 10, paddingBottom:10 ,  backgroundColor:'#E6E6E6'}}>
                        <View style={{width:'100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height:40 }}>
                            <View>
                                <Text style = {styles.headerText}>{item.name}</Text>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems:'center'}}>
                                <Feather name="map-pin" color={tintColor} size={styles.distanceText.fontSize} style = {{alignSelf:'center'}} />
                                <Text style = {styles.distanceText}> {itemDist.toFixed(1)} miles away  </Text>
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody >
                        <View style={{alignItems:'center', justifyContent:'space-around', flexDirection:'row',backgroundColor:'#EDEDED'}}>
                            <Feather name="phone" color={tintColor} size={40} onPress={() => this.dialCall(item.phonenumber)} />
                            <Feather name="map-pin" color={tintColor} size={40} onPress={() => this.toMap(item.address)}/>
                        </View>
                    </CollapseBody>
                </Collapse>
            </View>
        )
    }
        

    
        return (
                <View style={styles.container}>
                <FlatList
                    data={props.minorityData.sort((a, b) => {
                        const aDist = getDistance({ //get distance between plaza and current location
                        latitude: a.lat,
                        longitude:  a.lng
                     }, {
                             latitude: props.userLat,
                             longitude: props.userLong,
                         })
                      const bDist = getDistance({ //get distance between plaza and current location
                        latitude: b.lat,
                        longitude:  b.lng
                     }, {
                        latitude: props.userLat,
                        longitude: props.userLong,
                    })
                    
                      return aDist - bDist; })}
                    renderItem={({item}) => this.renderNativeItem(item)}
                    keyExtractor={(item, index) =>  index.toLocaleString()}
                />
                </View>     
        );
    
}

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerText: {
        fontSize:28,
        paddingLeft:10,
        alignItems:'center'
      }, 
      distanceText: {
          fontSize:16,
      },
      
    });
    


  





  