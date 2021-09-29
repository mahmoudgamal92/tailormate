import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, AsyncStorage,FlatList } from 'react-native';
import { AntDesign, Fontisto, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
export default function Reports({ route, navigation }) {
	const [selected, SetSelected] = React.useState(1);
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
	const pages = [
		{
			id: 1,
			title: 'لوحة التحكم'
		},
		{
			id: 2,
			title: 'بيانات شهرية'
		},
		{
			id: 3,
			title: 'المبيعات'
		},
		{
			id: 4,
			title: 'المستحقات'
		},
		{
			id: 5,
			title: 'الدفعيات'
		},
		{
			id: 6,
			title: 'الفواتير'
		},
	
	];
	return (
		<View style={{ flex: 1, backgroundColor: '#FFF' }}>
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
							fontFamily: 'Bold',
							color: '#FFF',
							marginLeft: 20
						}}
					>
						التقارير
					</Text>
				
				</View>

				<View style={{ justifyContent: "center", flexDirection: "row" }}>
					<Text style={{ fontFamily: "Bold", color: "#F9C227" }}>
						مرحبا, {user_name}
					</Text>
				</View>
			</View>

			
			<View>
         		<FlatList
				inverted
				    contentContainerStyle={{
						flexDirection: 'row-reverse',
						justifyContent:"space-around",
						paddingHorizontal: 20,
						paddingBottom:10,
						paddingTop:5,
					}}
				
				
					data={pages}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item, index) => item.id}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity activeOpacity={0.8} onPress={() => SetSelected(item.id)}>
								<Text style={selected == item.id ? styles.SelectedcategoryText : styles.categoryText}>
									{item.title}
								</Text>
							</TouchableOpacity>
						);
					}}
				/>
			</View>

			<View
				style={{
					paddingHorizontal: 10,
					borderRadius: 5,
					borderWidth: 2,
					borderColor: 'black',
					marginHorizontal: 10,
					marginVertical:80,
					paddingBottom: 20
				}}
			>
				<View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
					<Text style={{ color: 'grey', fontFamily: 'Bold', fontSize: 20 }}>أداء اليوم :</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<View style={{ width: '50%', paddingHorizontal: 5 }}>
						<TouchableOpacity
							onPress={() => navigation.navigate('Charts')}
							style={{
								width: '100%',
								backgroundColor: '#808080',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 10
							}}
						>
							<AntDesign name="shoppingcart" size={100} color="#FFF" />
							<Text style={{ color: '#FFF', fontFamily: 'Bold' }}>اجمالي المبيعات</Text>
						</TouchableOpacity>
					</View>

					<View style={{ width: '50%', paddingHorizontal: 5 }}>
						<TouchableOpacity
							style={{
								width: '100%',
								backgroundColor: '#F9C227',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 10
							}}
						>
							<FontAwesome5 name="dollar-sign" size={100} color="#FFF" />
							<Text style={{ color: '#FFF', fontFamily: 'Bold' }}>المدفوعات</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{ flexDirection: 'row', marginTop: 10 }}>
					<View style={{ width: '50%', paddingHorizontal: 5 }}>
						<TouchableOpacity
							style={{
								width: '100%',
								backgroundColor: '#922305',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 10
							}}
						>
							<MaterialIcons name="shopping-basket" size={100} color="#FFF" />
							<Text style={{ color: '#FFF', fontFamily: 'Bold' }}>طلبات مستلمة</Text>
						</TouchableOpacity>
					</View>

					<View style={{ width: '50%', paddingHorizontal: 5 }}>
						<TouchableOpacity
							style={{
								width: '100%',
								backgroundColor: '#EEEEEE',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 10
							}}
						>
							<FontAwesome5 name="handshake" size={100} color="grey" />
							<Text style={{ color: 'grey', fontFamily: 'Bold' }}>طلبات مستلمة</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
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
	},
	categoryContainer: {
		width: '100%',
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 15
	},

	categoryText: {
		color: 'grey',
		borderRadius: 2,
		borderColor: '#F9C227',
		paddingBottom: 5,
		marginHorizontal: 6,
		fontFamily: 'Bold'
	},

	SelectedcategoryText: {
		color: '#922305',
		borderBottomWidth: 3,
		borderRadius: 2,
		borderColor: '#F9C227',
		paddingBottom: 5,
		marginHorizontal: 6,
		fontFamily: 'Bold'
	}
});
