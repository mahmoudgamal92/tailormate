import React, { useState,useEffect } from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	Image, 
	TouchableOpacity, 
	TextInput, 
	Modal,
	FlatList,
	AsyncStorage } from 'react-native';
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function TaskManagment({ route, navigation }) {

	const [modalVisible, setModalVisible] = useState(false);
	const [selected, SetSelected] = React.useState(1);
	const [user_token, setUserToken] = React.useState("");
	
	const [name, setName] = React.useState("");
	const [days, setDays] = React.useState("");
	const pages = [
		{
			id: 1,
			title: 'المهام'
		},
		{
			id: 2,
			title: 'الثياب'
		},
		{
			id: 3,
			title: 'المستخدمين'
		},
	
	];

	useEffect(() => {
		_retrieveData();
			}, []);
			
			const _retrieveData = async () => {
			  try {
				const user_token = await AsyncStorage.getItem("user_token");
				setUserToken(user_token);
			  }
			  catch (error) {
				console.log(error);
			  }
			}

			const add_task = () => {

			let formData = new FormData();
			formData.append("tailor_token",user_token);
			formData.append("task_name",name);
			formData.append("task_duration", days);

			fetch('https://stakfort.com/tailor/api/tasks/add_task.php', {
				method: "POST",
				headers: {
					Accept: "*/*",
					"Content-type": "multipart/form-data;",
					"Accept-Encoding":"gzip, deflate, br",
					"Connection":"keep-alive"
				},
				body: formData,
			  })
				.then((response) =>  response.json())
				.then((responseJson) => {
				  if (responseJson.success == true) {
					alert(responseJson.data.message);
					navigation.navigate("Tasks");
				  }
				  else {
					alert(responseJson.data.message);
				  }
				})

			}

	return (
		<View style={{ flex: 1 }}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<TouchableOpacity
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
							style={{ alignItems: 'flex-start' }}
						>
							<AntDesign name="close" size={24} color="black" />
						</TouchableOpacity>
						<Text style={styles.modalText}>تفاصيل أضافة المهمة</Text>

						<TextInput
							placeholder="أسم المهمة"
							onChangeText={(name) => setName(name)}
							style={{
								height: 40,
								borderBottomWidth: 1,
								paddingHorizontal: 10,
								paddingVertical: 10,
								borderColor: 'grey',
								width: '100%',
								fontFamily: 'Bold',
								color: 'grey',
								textAlign:"right",
							}}
						/>

						<TextInput
						keyboardType="numeric"
							placeholder="الأيام"
							onChangeText={(days) => setDays(days)}
							style={{
								height: 40,
								borderBottomWidth: 1,
								paddingHorizontal: 10,
								paddingVertical: 10,
								borderColor: 'grey',
								width: '100%',
								fontFamily: 'Bold',
								color: 'grey',
								textAlign:"right"
							}}
						/>

						<TouchableOpacity
							  onPress={() => add_task()}
							style={{
								backgroundColor: '#F9C227',
								paddingVertical: 15,
								borderRadius: 10,
								width: '100%',
								marginTop: 20
							}}>

							<Text
								style={{
									color: 'white',
									textAlign: 'center',
									fontFamily: 'Bold'
								}}
							>
								حفظ
							</Text>

						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<View
				style={{
					paddingTop: Constants.statusBarHeight * 1.5,
					backgroundColor: '#922305',
					height: 120,
					top: 0,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					paddingHorizontal: 10,
				}}
			  >
					<View style={{ justifyContent: 'center', flexDirection: 'row',}}>
					<TouchableOpacity onPress={() => navigation.navigate("Home")} >
					<SimpleLineIcons name="arrow-right" size={30} color="#FFF" 
					style={{ paddingHorizontal: 10 }} 
					/>
					</TouchableOpacity>
				</View>
				<View style={{ justifyContent: 'center', flexDirection: 'row',width:300 }}>
					<Text style={{ fontFamily: 'ExtraBold', color: '#FFF' }}>ادارة المهام</Text>
				</View>

			
			</View>


			
			<View>

				<FlatList
				    contentContainerStyle={{
						flexDirection: 'row-reverse',
						justifyContent:"space-around",
						width:"100%",
						paddingHorizontal: 20,
						paddingBottom:10,
						paddingTop:5,
					}}
					// style={{	
					// 	borderBottomWidth:2,
					// 	borderBottomColor:"grey",
					// }}
				
					data={pages}
					horizontal={true}
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

			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
				<TouchableOpacity
					onPress={() => {
						setModalVisible(true);
					}}
					style={{
						borderRadius: 20,
						borderColor: 'grey',
						borderWidth: 1,
						width: '90%',
						paddingVertical: 30,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text
						style={{
							fontFamily: 'ExtraBold',
							color: '#F9C227',
							textAlign: 'center',
							fontSize: 20
						}}
					>
						اضافة مهمة جديدة
					</Text>

					<Ionicons name="md-alarm" size={30} color="#F9C227" style={{ marginLeft: 20 }} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: '90%'
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		fontFamily: 'Bold'
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



