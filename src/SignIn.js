import React, { Component, useState, useEffect } from "react";
import { Entypo,AntDesign,FontAwesome } from '@expo/vector-icons';
import Constants from "expo-constants";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Button,
  Platform,
  AsyncStorage,
  ScrollView
} from "react-native";
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      
      // For Async Storage
      user_token: "",
      user_id: "",
      user_name: "",
    }; 
  }

  LoginUser = () => {
    const { email, password } = this.state;

    let formData = new FormData();
    formData.append("user_email",email);
    formData.append("user_pwd", password);

        fetch("https://stakfort.com/tailor/api/signin.php", {
      method: "POST",
      headers: {
        Accept: "*/*",
       "Content-type": "multipart/form-data;",
       "Accept-Encoding":"gzip, deflate, br",
       "Connection":"keep-alive"
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
      if(responseJson.success == true)
      {
        alert("أهلا بك ," + responseJson.data.user_name);
        this.setState({
          user_token: responseJson.data.user_token,
          user_id : responseJson.data.user_id,
          user_name : responseJson.data.user_name,
        });
        
        this._storeData();
        this.props.navigation.navigate("Home")
      }
      else
      {
        alert(responseJson.data.message);

      }
      });
  };


  _storeData = async () => {
    const { user_token,user_id,user_name } = this.state;
    try {
      await AsyncStorage.setItem("user_token", user_token);
      await AsyncStorage.setItem("user_id", user_id);
      await AsyncStorage.setItem("user_name", user_name);
    } catch (error) {
      alert("هناك مشكلة في عملية تسجيل الدخول")
    }
  };
  render() {
    return (
      <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          padding: 20,
          paddingTop:Constants.statusBarHeight,
        }}
      >
        <Image
          style={{
            width: "100%",
            resizeMode: "contain",
            maxHeight:"25%"
          }}
          source={require('./../assets/login.png')}
        />     
             <Text
            style={{
              color: "#7D7D7D",
              textAlign:"auto",
              fontFamily: "Bold",
              width: "100%",
              fontSize:30
            }}
          >
              مرحبا
        </Text>

         <Text
            style={{
              color: "#F9C227",
              textAlign:"auto",
              fontFamily: "Bold",
              width: "100%",
              marginBottom:5,
            }}
          >
              البريد الألكتروني
        </Text>
        <TextInput
          onChangeText={(email) => this.setState({ email })}
          placeholder="أدخل البريد الألكتروني"
          caretHidden
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          autoCompleteType='email'
          style={{
            height: 40,
            marginBottom: 20,
            borderWidth: 1.5,
            paddingHorizontal: 10,
            borderColor: "#F9C227",
            borderRadius: 10,
            width: "100%",
            fontFamily: "Regular",
            textAlign: "right"

          }}
        />
         <Text
            style={{
              color: "#F9C227",
              textAlign:"auto",
              fontFamily: "Bold",
              width: "100%",
              marginBottom:5,
            }}
          >
              كلمة المرور
        </Text>

        <TextInput
          onChangeText={(password) => this.setState({ password })}
          placeholder="أدخل كلمةالمرور"
          secureTextEntry
          style={{
            height: 40,
            marginBottom: 20,
            borderWidth: 1.5,
            paddingHorizontal: 10,
            borderColor: "#F9C227",
            borderRadius: 10,
            width: "100%",
            fontFamily: "Regular",
            textAlign: "right"
          }}
        />   


      <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SignUp")}
          style={{
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign:"auto",
              fontFamily: "Bold",
            }}
          >
          نسيت كلمة المرور الخاصة بك ؟
        </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SignUp")}
          style={{
            width: "100%",
            marginBottom: 20,
            marginTop:10,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              color: "#922305",                
              textAlign:"auto",
              fontFamily: "Bold",
            }}
          >
            عضو جديد ؟
        </Text>
        <Text
            style={{
              textAlign:"auto",
              fontFamily: "Regular",
              marginRight:15,


            }}
          >
           قم بالتسجيل
        </Text>
        </TouchableOpacity>

        <TouchableOpacity
         onPress={this.LoginUser}
          style={{
            backgroundColor: "#F9C227",
            paddingVertical: 15,
            borderRadius: 10,
            width: "100%",
            marginBottom:10
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
               fontFamily: "Bold",
            }}
          >
            تسجيل الدخول
        </Text>
        </TouchableOpacity>


          <Text
            style={{
              color: "#1A1D3D",
              textAlign: "center",
              fontFamily: "Bold",
            }}
          >
          أو بأستخدام وسائل التواصل الأجتماعي
        </Text>
        
        
        <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            marginTop:10
            }}>

          <View style={{borderRadius:50,borderColor:"#3F3D56",borderWidth:3,}}>
          <Entypo name="facebook" size={50} color="#FFF"
          style={{
            borderRadius:50,
            borderColor:"#3F3D56",
            margin:2,
            padding:5,
            backgroundColor:"#3F3D56"
            
            }} 
            />
          </View>
          
          <View style={{borderRadius:50,borderColor:"#3F3D56",borderWidth:3,marginHorizontal:20}}>
          <AntDesign name="twitter"size={50} color="#FFF" 
          style={{
            borderRadius:50,
            borderColor:"#1f669a",
            margin:2,
            padding:5,
            backgroundColor:"#3F3D56"
            }}/>
          </View>

          <View style={{borderRadius:50,borderColor:"#3F3D56",borderWidth:3,}}>
          <AntDesign name="instagram"  size={50} color="#FFF"
          style={{
            borderRadius:50,
            borderColor:"#1f669a",
            margin:2,
            padding:5,
            backgroundColor:"#3F3D56"
            }} 
            />
          </View>
          </View>
      </View>
      </ScrollView>
    );
  }
}
