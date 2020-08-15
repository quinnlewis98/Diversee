import React from 'react'
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, View, Text, TextInput } from 'react-native'
import email from 'react-native-email'
import {Dimensions} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

var { screenHeight, screenWidth } = Dimensions.get('window');

export default class HelpScreen extends React.Component {

  state = {
    subject: '',
    body: ''
 }
 handleSubject = (text) => {
    this.setState({ subject: text })
 }

 handleBody = (text) => {
    this.setState({ body: text })
 }

 handleEmail = () => {
  const to = ['diverseeapp@gmail.com'] // string or array of email addresses
  email(to, {
      // Optional additional arguments
      subject: this.state.subject,
      body: this.state.body,
  }).catch(console.error)
}

    render() {

      let subjects = [{value:'New Restaurants'}, {value:'Feedback'}, {value:'Bugs'}, {value:'Other'}]
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style = {styles.BodyText}>
                  Help us reach all minority-owned and LGBTQ-owned restaurants. We love getting feedback, please share your thoughts and ideas
                </Text>

                <Dropdown
                  label = "Subject"
                  data = {subjects}
                  onChangeText = {this.handleSubject}
                />
                
                <TextInput style = {styles.input2}
                  multiline = {true}
                  numberOfLines={4}
                  underlineColorAndroid = "transparent"
                  placeholder = "  Email Body"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                  onChangeText = {this.handleBody}
                  blurOnSubmit = {true}
                  />

                
                <TouchableOpacity style = {styles.submitButton} onPress={this.handleEmail}>
                  <Text style = {styles.ButtonText}>Send Email</Text>
                </TouchableOpacity>
                
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:23,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        paddingTop:40
        
    },
    input: {
      borderColor: '#7a42f4',
      borderWidth: 1,
      width: screenWidth,
   },
    BodyText: {
        fontSize: 18

    },
    ButtonText: {
      fontSize: 18,
      color: 'white'
    },
    button: {
      alignItems: "center",
      padding: 10,
      backgroundColor: "#DDDDDD",
    },
    input: {
      margin: 15,
      height: 40,
      borderColor: "#9a73ef",
      borderWidth: 1
   },
   input2: {
    margin: 15,
    height: 160,
    borderColor: "#9a73ef",
    borderWidth: 1
 },
   submitButton: {
    backgroundColor: "#9a73ef",
    padding: 10,
    margin: 15,
    height: 40,
 },
})