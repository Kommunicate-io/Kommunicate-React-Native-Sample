import React, {Component} from 'react';
import {NativeModules, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import applicationId from '../applicationid';

import LinearGradient from 'react-native-linear-gradient';

var KommunicateChat = NativeModules.RNKommunicateChat;

export class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
      };

    constructor() {
        super();
        this.state = {
          email: '',
          name: '',
          password: '',
        }
        this.appid = applicationId.appid;
    }

    loginVisitor = () => {
      KommunicateChat.loginAsVisitor(this.appid, (status, message) => {
        if(status == 'Success') {
            KommunicateChat.isLoggedIn((response) => {
              if(response == "True") {
                this.props.navigation.navigate('Home');
              } else {
                console.log("Error logging in : " + message);
              }
            });
            this.props.navigation.replace('Home');
       
        } else if (obj == 'Error') {
          console.log("Error logging in : " + message);
        }
    });
    }

    loginUser = () => {
        if(this.state.email == '' || this.state.password == '') {
          console.log('Email and password cannot be empty.');
          return;
        }
        
        var kmUser = {
          userId : this.state.email,
          displayName: this.state.name,
          password: this.state.password,
          applicationId : this.appid,  
          authenticationTypeId: 1,
          deviceApnsType : 0 
          };

        KommunicateChat.loginUser(kmUser, (status, message) => {
            if(status == 'Success') {
                KommunicateChat.isLoggedIn((response) => {
                  if(response == "True") {
                    this.props.navigation.navigate('Home');
                  } else {
                    console.log("Error logging in")
                  }
                });
                this.props.navigation.replace('Home');
           
            } else if (status == 'Error') {
                console.log("Error logging in : " + message);
            }
        });
    }

    createConversation = () => {
      let kmUser = {
        'userId' : 'reytum',
        'password' : 'reytum'
      }
      KommunicateChat.buildConversation(
        {
          appId: this.appid,
          kmUser: JSON.stringify(kmUser),
          isSingleConversation: false,
          conversationInfo: JSON.stringify({
            "key1": "value1",
            "key2": "value2"
          })
        }, (status, message) => {
          console.log("Received while creating conversation, status : " + status + " and message : " + message);
      });
    }

    componentDidMount() {
      if(KommunicateChat.isLoggedIn((status) => {
        if(status == "True") {
          this.props.navigation.replace('Home');
        }
      }));
    }

    render() {
        return(
    <View style={styles.maincontainer}>
      <Text style={styles.title}>kommunicate.io</Text>
      <View style={styles.inputcontainer}>
      <TextInput placeholder="userId" onChangeText={(text) => {this.setState({email: text})}} style={styles.input}></TextInput>
      <TextInput secureTextEntry={true} placeholder="password" onChangeText={(text) => {this.setState({password: text})}} style={styles.default}></TextInput>
      </View>
      <View style={styles.buttoncontainer}>
        <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#43e97b', '#38f9d7']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.loginUser}><Text style={{color: 'white'}}>LOGIN</Text></TouchableOpacity></LinearGradient>
        <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.loginVisitor}><Text style={{color: 'white'}}>LOGIN AS VISITOR</Text></TouchableOpacity></LinearGradient>
        <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.createConversation}><Text style={{color: 'white'}}>Create Conversation without login</Text></TouchableOpacity></LinearGradient>
        <Text style={styles.infotext}>When logging in as visitor, you dont need to fill the email, name and 
        password fields. Clicking the 'Login as visitor' button will log you in with a random userId.</Text>
      </View>
      <Text style={styles.privacytext}></Text>
    </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: 20 
    },
    title: {
      marginTop: 30,
      textAlign: "center", 
      color: '#43e97b', 
      fontSize: 20
    },
    input: {
      borderBottomWidth: 2,
      borderBottomColor: 'grey',
      padding : 0,
      fontSize: 16,
    },
    inputcontainer: {
      marginTop: 25, 
      alignItems: 'stretch',
    },
    buttoncontainer: {
      marginTop: 30,
    },
    infotext: {
      textAlign: "center",
      fontSize: 12,
      color: 'grey',
      marginStart: 6,
      marginEnd: 6,
    }, 
    privacytext: {
      
    },
    button: {
      borderRadius: 30,
      marginBottom: 8,
    }
});