import React,{useEffect} from 'react';
import { Button, StyleSheet, View,Image,Text,AsyncStorage } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from "react-native-animatable";

export default function Spalsh({ route, navigation }){

  useEffect(() => {
		_retrieveData();
			}, []);

			const _retrieveData = async () => {
			  try {
				const user_id = await AsyncStorage.getItem("user_id");
        if(user_id !== null)
        {

          setTimeout(() => {
            navigation.navigate("Home");
          }, 2000) 
        }
        else
        {
          setTimeout(() => {
            navigation.navigate("SignIn");
          }, 2000) 
        }
			  }
			  catch (error) {
				console.log(error);
			  }
			}
    return (
      <View style={styles.animationContainer}>
          <View>
          <Animatable.Image
         animation="fadeInDownBig"
          duraton="1000"
        source={require('./../assets/slogan.png')}
         style={{width:300,height:300,marginBottom:100}}/>
          </View>
          <Animatable.View
           animation="fadeInUpBig"
           duraton="500"
          >
        <LottieView
         autoPlay
          style={{
            width: 100,
            height: 100,
            bottom:0
          }}
          source={require('./../assets/loader.json')}
        />
        </Animatable.View>
      </View>
    );
  }

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height:"100%"
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
