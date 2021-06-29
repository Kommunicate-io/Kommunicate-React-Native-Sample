import React, {Component} from 'react';
import {Platform, NativeModules, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import applicationId from '../applicationid';

import LinearGradient from 'react-native-linear-gradient';

var KommunicateChat = NativeModules.RNKommunicateChat;

export class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
      };

    constructor() {
        super();
        this.state = {
          welcometext: 'Welcome user.'
        }
        this.appid = applicationId.appid;
    }

    componentDidMount() {
      if(KommunicateChat.isLoggedIn((status) => {
        if(status == "False") {
          this.props.navigation.replace('Login');
        }
      }));
    }

    openConversation = () => {
      KommunicateChat.openConversation((status, message) => {
        if(status == 'Error') {
          console.log("Error in opening conversation : " + message);
        }
      });

      // RNKommunicateChat.openParticularConversation("23026606", true, (status, message) => {
      //   if(status == 'Error') {
      //     console.log("Error in opening conversation : " + message);
      //   } else {
      //     console.log("Successfully opened conversation : " + message);
      //   }
      // });
    }

    createConversation = () => {
      KommunicateChat.buildConversation(
        {
          appId: this.appid, 
          isSingleConversation: true,
          conversationMetadata: {
            'test1': 'value1',
            'test2': 'value2'
          }
        }, (status, message) => {
          console.log("Received while creating conversation, status : " + status + " and message : " + message);
      });
    }
    
    logout = () => {
      KommunicateChat.logout((response) => {
        if(response == "Success") {
          this.props.navigation.replace('Login');
        } else {
          console.log("Error logging out");
        }
      }); 
    }

    updateUserDetails = () => {
      let date = new Date();
      KommunicateChat.updateUserDetails({
        email: "reytum007+" + date.getTime()%100000 + "@gmail.com",
        displayName: ("RN-" + (Platform.OS === 'android' ? "Android-" : "iOS-") + date.getTime()%100000),
        metadata: {
          'Email-ID': "reytum007+" + date.getTime()%100000 + "@gmail.com",
          'Phone number': date.getTime()%100000,
          'Platform': ("RN-" + (Platform.OS === 'android' ? "Android" : "iOS"))
        } 
      }, (status, message) => {
        console.log("Update user details, status : " + status + " and message : " + message);
      });
    }

    updateConversationAssignee = () => {
        KommunicateChat.updateConversationAssignee({
          clientConversationId: "58458073",
          conversationAssignee: "sunil@applozic.com"}, (success, error) => {
            console.log("Update conversation assignee, status : " + success + " and message : " + error);
          });
    }

    updateTeamId = () => {
      KommunicateChat.updateTeamId({
        clientConversationId: "58458073",
        teamId: "52170696"
       }, (success, error) => {
          console.log("Update teamId, status : " + success + " and message : " + error);
        });
    }

    updateConversationInfo = () => {
      KommunicateChat.updateConversationInfo({
        clientConversationId: "58458073",
        conversationInfo: {
          "test1": "value1",
          "test2": "value2"
        }
      }, (success, error) => {
          console.log("Update conversation info, status : " + success + " and message : " + error);
        });
    }

    render() {
        return(
            <View style= {styles.maincontainer}>
                <Text style={styles.title}>{this.state.welcometext}</Text>
                <Text style={{color:'grey', textAlign: 'center', marginBottom: 20}}>Here you can talk with our customer support.</Text>
                <View style={styles.buttoncontainer}>
                <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#43e97b', '#38f9d7']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.createConversation}><Text style={{color: 'white'}}>CREATE CONVERSATION</Text></TouchableOpacity></LinearGradient>
                <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#43e97b', '#38f9d7']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.openConversation}><Text style={{color: 'white'}}>OPEN CONVERSATION</Text></TouchableOpacity></LinearGradient>
                <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#43e97b', '#38f9d7']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.updateUserDetails}><Text style={{color: 'white'}}>UPDATE USER DETAILS</Text></TouchableOpacity></LinearGradient>
                <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.updateConversationAssignee}><Text style={{color: 'white'}}>UPDATE ASSIGNEE</Text></TouchableOpacity></LinearGradient>
                <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.updateTeamId}><Text style={{color: 'white'}}>UPDATE TEAM ID</Text></TouchableOpacity></LinearGradient>
                <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.updateConversationInfo}><Text style={{color: 'white'}}>UPDATE CONVERSATION INFO</Text></TouchableOpacity></LinearGradient>
                <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.logout}><Text style={{color: 'white'}}>LOGOUT</Text></TouchableOpacity></LinearGradient>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: 'center'
      },
      title: {
        marginBottom: 2,
        marginTop: 18,  
        color: '#43e97b',
        fontSize: 20,
        textAlign: 'center',
      },
      button: {
        borderRadius: 30,
        marginStart: 8,
        marginEnd: 8,
        marginBottom: 8
      }
});