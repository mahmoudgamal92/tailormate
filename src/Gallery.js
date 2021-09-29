import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import {
	Fontisto
} from '@expo/vector-icons';
import Constants from 'expo-constants';


export default function Gallery({ route, navigation }) {
	const [user_name, setUserName] = React.useState("");

	useEffect(() => {
		_retrieveData();
			}, []);
			
			const _retrieveData = async () => {
			  try {
				const user_token = await AsyncStorage.getItem("user_token");
				const user_name = await AsyncStorage.getItem("user_name");
				//setUserToken(user_token);
				setUserName(user_name);
			  }
			  catch (error) {
				console.log(error);
			  }
			}
	return (
        <ScrollView>
		<View style={{ flex: 1 }}>
		<View
				style={{
					paddingTop: Constants.statusBarHeight * 1.5,
					backgroundColor: '#922305',
					height: 120,
					top: 0,
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: 10
				}}
			>
				

				<View style={{ justifyContent: 'center', flexDirection: 'row' }}>


				<TouchableOpacity onPress={() => navigation.openDrawer()}>
						<Fontisto name="right-align" size={30} color="#FFF" />
					</TouchableOpacity>
					
					<Text
						style={{
							textAlign: 'center',
							fontFamily: 'ExtraBold',
							color: '#FFF',
							marginLeft: 20
						}}
					>
						المعرض
					</Text>
					
				</View>

				<View style={{ justifyContent: "center", flexDirection: "row" }}>
					<Text style={{ fontFamily: "Bold", color: "#F9C227" }}>
						مرحبا, {user_name}
					</Text>
				</View>
			</View>


			<View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
				<TouchableOpacity
				onPress={() => navigation.navigate("SubGallery")}
					style={{
						height: 280,
						elevation: 2,
						backgroundColor: '#FFF',
						marginTop: 20,
						borderRadius: 15,
						marginBottom: 10,
						width: '50%',
						marginRight: 5
					}}
				>
					<Image
						source={require('./../assets/dress/sudian_dress.png')}
						style={{
							width: '100%',
							height: '80%',
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15
						}}
					/>
					<View
						style={{
							paddingTop: 10,
							paddingHorizontal: 10
						}}
					>
						<Text
							style={{
								color: '#1A1D3D',
								textAlign: 'right',
								fontFamily: 'Bold'
							}}
						>
							ثوب سعودي
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						height: 280,
						elevation: 2,
						backgroundColor: '#FFF',
						marginTop: 20,
						borderRadius: 15,
						marginBottom: 10,
						width: '50%',
						marginLeft: 3
					}}
				>
					<Image
						source={require('./../assets/dress/kuwaitian_dress.png')}
						style={{
							width: '100%',
							height: '80%',
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15
						}}
					/>
					<View
						style={{
							paddingTop: 10,
							paddingHorizontal: 10
						}}
					>
						<Text
							style={{
								color: '#1A1D3D',
								textAlign: 'right',
								fontFamily: 'Bold'
							}}
						>
							ثوب كويتي
						</Text>
					</View>
				</TouchableOpacity>
			</View>





            <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10 }}>
				<TouchableOpacity
					style={{
						height: 280,
						elevation: 2,
						backgroundColor: '#FFF',
						marginTop: 20,
						borderRadius: 15,
						marginBottom: 10,
						width: '50%',
						marginRight: 5
					}}
				>
					<Image
						source={require('./../assets/dress/surian_dress.png')}
						style={{
							width: '100%',
							height: '80%',
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15
						}}
					/>
					<View
						style={{
							paddingTop: 10,
							paddingHorizontal: 10
						}}
					>
						<Text
							style={{
								color: '#1A1D3D',
								textAlign: 'right',
								fontFamily: 'Bold'
							}}
						>
							ثوب سوري
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						height: 280,
						elevation: 2,
						backgroundColor: '#FFF',
						marginTop: 20,
						borderRadius: 15,
						marginBottom: 10,
						width: '50%',
						marginLeft: 3
					}}
				>
					<Image
						source={require('./../assets/dress/uae_dress.png')}
						style={{
							width: '100%',
							height: '80%',
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15
						}}
					/>
					<View
						style={{
							paddingTop: 10,
							paddingHorizontal: 10
						}}
					>
						<Text
							style={{
								color: '#1A1D3D',
								textAlign: 'right',
								fontFamily: 'Bold'
							}}
						>
							ثوب اماراتي
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
        </ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F7F7F7'
	},
	listItem: {
		margin: 10,
		padding: 10,
		backgroundColor: '#FFF',
		width: '95%',
		flex: 1,
		alignSelf: 'center',
		flexDirection: 'row',
		borderRadius: 5,
		justifyContent: 'center'
	}
});
