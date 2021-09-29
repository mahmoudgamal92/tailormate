import React, { Component, useState, useEffect } from 'react';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';

import Constants from 'expo-constants';
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
	KeyboardAvoidingView
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			U_name: '',
			U_email: '',
			U_password: '',		
		};
	}

	SignUp = () => {
		const { U_name, U_email,U_password } = this.state;
	
		let formData = new FormData();
		formData.append("user_name",U_name);
		formData.append("email", U_email);
		formData.append("password", U_password);
	
			fetch("https://stakfort.com/tailor/api/signup.php", {
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
			alert(responseJson.data.message);
			this.props.navigation.navigate("SignIn")
		  }
		  else
		  {
			alert(responseJson.data.message);
		  }
		  });
	  };
	
	render() {
		return (
			<ScrollView>
				<KeyboardAvoidingView behavior="position">
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
							flexGrow: 1,
							padding: 20,
							paddingTop: Constants.statusBarHeight
						}}
					>
						<Image
							style={{
								width: '100%',
								maxHeight: '30%',
								resizeMode: 'contain'
							}}
							source={require('./../assets/signup.png')}
						/>

						<Text
							style={{
								color: '#7D7D7D',
								textAlign:"auto",
								fontFamily: 'Bold',
								width: '100%',
								fontSize: 30
							}}
						>
							انشاء حساب
						</Text>

						<Text
							style={{
								color: '#922305',
								textAlign:"auto",
								fontFamily: 'Bold',
								width: '100%',
								marginBottom:10
							}}
						>
							أسم المستخدم
						</Text>
						<TextInput
							onChangeText={U_name => this.setState({ U_name })}
							placeholder="أدخل أسم المستخدم"
							style={{
								height: 40,
								marginBottom: 20,
								borderWidth: 1.5,
								paddingHorizontal: 10,
								borderColor: '#922305',
								borderRadius: 10,
								width: '100%',
								fontFamily: 'Bold',
								textAlign:"auto",
							}}
						/>

						<Text
							style={{
								color: '#922305',
								textAlign:"auto",
								fontFamily: 'Bold',
								width: '100%',
								marginBottom:10
							}}
						>
							البريد الألكتروني
						</Text>

						<TextInput
							onChangeText={U_email => this.setState({ U_email })}
							placeholder="أدخل البريد الألكتروني "
							style={{
								height: 40,
								marginBottom: 20,
								borderWidth: 1.5,
								paddingHorizontal: 10,
								borderColor: '#922305',
								borderRadius: 10,
								width: '100%',
								fontFamily: 'Bold',
								textAlign:"auto",
							}}
						/>

						<Text
							style={{
								color: '#922305',
								textAlign:"auto",
								fontFamily: 'Bold',
								width: '100%',
								marginBottom:10
							}}
						>
							كلمة المرور
						</Text>

						<TextInput
							onChangeText={U_password => this.setState({ U_password })}
							placeholder="أدخل كلمة المرور "
							secureTextEntry
							style={{
								height: 40,
								marginBottom: 20,
								borderWidth: 1.5,
								paddingHorizontal: 10,
								borderColor: '#922305',
								borderRadius: 10,
								width: '100%',
								fontFamily: 'Bold',
								textAlign: 'right'
							}}
						/>

						<TouchableOpacity
							  onPress={this.SignUp}
							
							style={{
								backgroundColor: '#922305',
								paddingVertical: 15,
								borderRadius: 10,
								width: '100%'
							}}
						>
							<Text
								style={{
									color: 'white',
									textAlign: 'center',
									fontFamily: 'Bold'
								}}
							>
								تسجيل الدخول
							</Text>
						</TouchableOpacity>


						<View style={{ flexDirection: 'row-reverse',marginTop:30 }}>
						<TouchableOpacity
						  onPress={() => this.props.navigation.navigate("SignIn")}
						>
						<Text
								style={{
									fontFamily: 'Bold',
									color: '#922305',
									marginLeft:10
								}}
							>
								تمتلك حساب ؟
							</Text>
						</TouchableOpacity>

							<Text
								style={{
									fontFamily: 'Bold',
									color: 'grey'
								}}
							>
								قم بتسجيل الدخول
							</Text>
						</View>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}
