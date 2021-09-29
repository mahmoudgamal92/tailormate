import React, { useState,useEffect } from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	Image, 
	TouchableOpacity, 
	ScrollView, 
	AsyncStorage, 
	TextInput,
	ActivityIndicator,
	Modal
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
	SimpleLineIcons,
	AntDesign,
	Entypo
} from '@expo/vector-icons';
export default function StoreLocation({ route, navigation }) {

	const [logo_modal, setLogoModalVisible] = useState(false);
	const [store_modal, setStoreModalVisible] = useState(false);
	
	const [isLoading, SetLoading] = useState(false);
	const [token, setUserToken] = React.useState('');
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [postcode, setPostcode] = useState("");
	const [area, setArea] = useState("");
	const [data, setData] = useState([]);

	 // Logo Image Data
	 const [LogoImg_title, setLogoImg_title] = useState("");
	 const [LogoImg_uri, setLogoImg_uri] = 
	 useState("https://stakfort.com/tailor/assets/photo.png");
	 const [LogoImg_type, setLogoImg_type] = useState(null);

   // Store Image Data
	 const [StoreImg_title, setStoreImg_title] = useState("");
	 const [StoreImg_uri, setStoreImg_uri] = 
	 useState("https://stakfort.com/tailor/assets/photo.png");
	 const [StoreImg_type, setStoreImg_type] = useState(null);

	 useEffect(() => {
		_retrieveData();
		getPermissionAsync();
			}, []);
			const _retrieveData = async () => {
			  try {
				const user_token = await AsyncStorage.getItem("user_token");
				setUserToken(user_token);
		  
				let formData = new FormData();
				formData.append("token",user_token);
		  
				fetch("https://stakfort.com/tailor/api/get_store.php",{
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
				.then((json) => {
				  setData(json.data);
				  setCountry(json.data.country);
				  setCity(json.data.city);
				  setAddress(json.data.address);
				  setPostcode(json.data.post_code);
				  setArea(json.data.area);
		
					setLogoImg_uri(json.data.logo);
					setStoreImg_uri(json.data.store_pic)
				  
				})
				.catch((error) => console.error(error))
			  }
			  catch (error) {
				console.log(error);
			  }
			}

			const getPermissionAsync = async () => {
				if (Platform.OS !== "web") {
				  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
				  if (status !== "granted") {
					alert("نأسف لابد من السماح للتطبيق بالوصول الي الكاميرا للمتابعة");
				  }
				}
			  };

			  // Upload Face Image
			const _pickLogoImgGallery = async () => {
				setLogoModalVisible(!logo_modal);
				try {
				  let result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [3,3],
				  });
				  if (!result.cancelled) {
					setLogoImg_uri(result.uri);
					// From here Preparing to Upload
					let localUri = result.uri;
					let filename = localUri.split("/").pop();
					setLogoImg_title(filename);
					// Infer the type of the image
			
					let match = /\.(\w+)$/.exec(filename);
					let type = match ? `image/${match[1]}` : `image`;
					setLogoImg_type(type)
					console.log(filename);
					console.log(type);
			
				  }
				  console.log(result);
				} catch (E) {
				  console.log(E);
				}
			  };




		 // Upload Face Image
			const _pickLogoImgCamera = async () => {
				setLogoModalVisible(!logo_modal);
				try {
				  const permissionResult = await ImagePicker.requestCameraPermissionsAsync(
					{
					  quality : 0
					}
				  );
			
				  if (permissionResult.granted === false) {
					alert("لابد من السماح للتطبيق بالوصول للكاميرا لألتقاط الصور");
					return;
				  }
			
				  const result = await ImagePicker.launchCameraAsync();
			
				  if (!result.cancelled) {
					setLogoImg_uri(result.uri);
					// From here Preparing to Upload
					let localUri = result.uri;
					let filename = localUri.split("/").pop();
					setLogoImg_title(filename);
					// Infer the type of the image
			
					let match = /\.(\w+)$/.exec(filename);
					let type = match ? `image/${match[1]}` : `image`;
					setLogoImg_type(type)
					console.log(filename);
					console.log(type);
			
				  }
				  console.log(result);
				} catch (E) {
				  console.log(E);
				}
			  };



              // Upload Body Image
			  const _pickStoreImgGallery = async () => {
				setStoreModalVisible(!store_modal);

				try {
				  let result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [3,3],
				  });
				  if (!result.cancelled) {
					setStoreImg_uri(result.uri);
					// From here Preparing to Upload
					let localUri = result.uri;
					let filename = localUri.split("/").pop();
					setStoreImg_title(filename);
					// Infer the type of the image
			
					let match = /\.(\w+)$/.exec(filename);
					let type = match ? `image/${match[1]}` : `image`;
					setStoreImg_type(type)
					console.log(filename);
					console.log(type);
				  }
				  console.log(result);
				} catch (E) {
				  console.log(E);
				}
			  };



			  
              // Upload Body Image
			  const _pickStoreImgCamera = async () => {
				setStoreModalVisible(!store_modal);
				try {
				  const permissionResult = await ImagePicker.requestCameraPermissionsAsync(
					{
					  quality : 0
					}
				  );
			
				  if (permissionResult.granted === false) {
					alert("لابد من السماح للتطبيق بالوصول للكاميرا لألتقاط الصور");
					return;
				  }
			
				  const result = await ImagePicker.launchCameraAsync();
			
				  if (!result.cancelled) {
					setStoreImg_uri(result.uri);
					// From here Preparing to Upload
					let localUri = result.uri;
					let filename = localUri.split("/").pop();
					setStoreImg_title(filename);
					// Infer the type of the image
			
					let match = /\.(\w+)$/.exec(filename);
					let type = match ? `image/${match[1]}` : `image`;
					setStoreImg_type(type)
					console.log(filename);
					console.log(type);
				  }
				  console.log(result);
				} catch (E) {
				  console.log(E);
				}
			  };


			  const update_storelocation = () => {
				let formData = new FormData();
				formData.append("tailor_token", token);
				  formData.append("country", country);
				  formData.append("city", city);
				  formData.append("address", address);
				  formData.append("post_number", postcode);
				  formData.append("area", area);

				  if (LogoImg_type !== null && StoreImg_type !== null) {
				  formData.append("logo",
				  { 
					uri: LogoImg_uri,
					name: LogoImg_title, 
					type: LogoImg_type 
				  });
				  formData.append("store_pic",
				  { 
					uri: StoreImg_uri,
					name: StoreImg_title, 
					type: StoreImg_type 
				  });
				}
					SetLoading(true);
				fetch('https://stakfort.com/tailor/api/store_location.php', {
					method: "POST",
					headers: {
					  Accept: "*/*",
					 "Content-type": "multipart/form-data;",
					 "Accept-Encoding":"gzip, deflate, br",
					 "Connection":"keep-alive"},
				  body: formData,
				})
				  .then((response) =>  response.json())
				  .then((responseJson) => {
					if (responseJson.success == true) {
					  SetLoading(false);
					  alert(responseJson.data.message);
					  navigation.navigate("Home");
					}
					else {
					  SetLoading(false);
					  alert(responseJson.data.message);
					}
				  })
			  }

	return (
		<ScrollView>
			<View style={{ flex: 1 }}>
			<Modal
          animationType="slide"
          transparent={true}
          visible={logo_modal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setLogoModalVisible(!logo_modal);
                }}
                style={{ alignItems: "flex-start" }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalText}>صورة اللوجو</Text>

              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                   onPress={() => _pickLogoImgCamera()}
                  style={{
                    backgroundColor: "#F9C227",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "45%",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="camera" size={24} color="#FFF" />
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Bold"
                    }}
                  >
                    الكاميرا
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                   onPress={() => _pickLogoImgGallery()}
                   style={{
                    backgroundColor: "#F9C227",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "45%",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="images" size={24} color="#FFF" />
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Bold"
                    }}
                  >
                    المعرض
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


        <Modal
          animationType="slide"
          transparent={true}
          visible={store_modal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setStoreModalVisible(!store_modal);
                }}
                style={{ alignItems: "flex-start" }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalText}>صورة المتجر</Text>

              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                onPress={() => _pickStoreImgCamera()}
                  style={{
                    backgroundColor: "#F9C227",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "45%",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="camera" size={24} color="#FFF" />
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Bold"
                    }}
                  >
                    الكاميرا
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => _pickStoreImgGallery()}

                  style={{
                    backgroundColor: "#F9C227",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "45%",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="images" size={24} color="#FFF" />
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Bold"
                    }}
                  >
                    المعرض
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
				<View
					style={{
						backgroundColor: '#5B5B5B',
						paddingVertical: 20,
						height: 120,
						top: 0,
						flexDirection: 'row',
						justifyContent: 'flex-start',
						paddingHorizontal: 10,
						alignItems: 'center'
					}}
				>

	             <View style={{ justifyContent: 'center' }}>
				 <TouchableOpacity
					onPress={() => navigation.navigate("Home")}
					>
						<SimpleLineIcons name="arrow-right" size={30} color="#FFF" 
						  style={{ marginHorizontal: 15 }} />
						  </TouchableOpacity>
					</View>

					<View style={{ justifyContent: 'center' }}>
						<Text
							style={{
								textAlign: 'center',
								fontFamily: 'Bold',
								color: '#FFF',
								fontSize: 20
							}}
						>
							تفاصيل الموقع
						</Text>
					</View>

				
				</View>

				<View style={{ paddingHorizontal: 10, paddingTop: 25 }}>
					<Text style={{ fontFamily: 'Bold', fontSize: 18, marginBottom: 20 }}>تفاصيل المتجر :</Text>
				</View>
				<View style={{ paddingHorizontal: 10 }}>
					<TextInput
						placeholder="أسم البلد"
						onChangeText={(country) => setCountry(country)}
						defaultValue={data.country}

						style={{
							height: 40,
							borderWidth: 1,
							borderRadius: 5,
							paddingHorizontal: 10,
							paddingVertical: 10,
							borderColor: 'grey',
							width: '100%',
							fontFamily: 'Bold',
							color: 'grey',
							marginBottom: 25
						}}
					/>

					<TextInput
					    defaultValue={data.city}
						placeholder="أسم المدينة"
						onChangeText={(city) => setCity(city)}
						style={{
							height: 40,
							borderWidth: 1,
							borderRadius: 5,
							paddingHorizontal: 10,
							paddingVertical: 10,
							borderColor: 'grey',
							width: '100%',
							fontFamily: 'Bold',
							color: 'grey',
							marginBottom: 25
						}}
					/>

					<TextInput
					  defaultValue={data.address}
						placeholder=" العنوان"
						onChangeText={(address) => setAddress(address)}
						style={{
							height: 40,
							borderWidth: 1,
							borderRadius: 5,
							paddingHorizontal: 10,
							paddingVertical: 10,
							borderColor: 'grey',
							width: '100%',
							fontFamily: 'Bold',
							color: 'grey',
							marginBottom: 25
						}}
					/>

					<TextInput
					defaultValue={data.post_code}
						placeholder="الرقم البريدي"
						onChangeText={(postcode) => setPostcode(postcode)}

						style={{
							height: 40,
							borderWidth: 1,
							borderRadius: 5,
							paddingHorizontal: 10,
							paddingVertical: 10,
							borderColor: 'grey',
							width: '100%',
							fontFamily: 'Bold',
							color: 'grey',
							marginBottom: 25,
							textAlign:"right"
						}}
					/>

					<TextInput
					defaultValue={data.area}
						placeholder="أختر المنطقة"
						onChangeText={(area) => setArea(area)}
						style={{
							height: 40,
							borderWidth: 1,
							borderRadius: 5,
							paddingHorizontal: 10,
							paddingVertical: 10,
							borderColor: 'grey',
							fontFamily: 'Bold',
							width: '100%',
							color: 'grey',
							marginBottom: 25
						}}
					/>
				</View>

				<View style={{ flexDirection: 'row',marginBottom: 20 }}>
					<View style={{ width: '50%', paddingHorizontal: 5,alignItems: 'center'}}>
						<Text style={{ fontFamily: "Bold",marginBottom: 10 }}>
							صورة اللوجو:
							</Text>
					<TouchableOpacity
					 onPress={() => {
						setLogoModalVisible(true);
					  }}
						>
						<Image
							style={{
								width: 120,
								height: 120,
								resizeMode: 'contain',
								borderRadius:15

							}}
							source={{uri:LogoImg_uri}}
						/>
						</TouchableOpacity>
					</View>

					<View style={{ width: '50%', paddingHorizontal: 5,alignItems: 'center' }}>
					<Text style={{ fontFamily: "Bold",marginBottom: 10 }}>
							صورة المتجر:
							</Text>
					<TouchableOpacity
					onPress={() => {
						setStoreModalVisible(true);
					}}						>
						<Image
							style={{
								width: 120,
								height: 120,
								resizeMode: 'contain',
								borderRadius:15
							}}
							source={{uri:StoreImg_uri}}
						/>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
					<TouchableOpacity
			            onPress={() => update_storelocation()}
						style={{
							backgroundColor: '#F9C227',
							paddingVertical: 15,
							borderRadius: 10,
							width: '100%'
						}}
					>
					 {isLoading == false
              ? <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Bold"
                  }}
                >
                حفظ و متابعة
                </Text>
              : <ActivityIndicator size="large" color={"#FFF"} />}
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#F7F7F7"
	},
	listItem: {
	  margin: 10,
	  padding: 10,
	  backgroundColor: "#FFF",
	  width: "95%",
	  flex: 1,
	  alignSelf: "center",
	  flexDirection: "row",
	  borderRadius: 5,
	  justifyContent: "center"
	},
	centeredView: {
	  flex: 1,
	  justifyContent: "center",
	  alignItems: "center",
	  marginTop: 22
	},
	modalView: {
	  margin: 20,
	  backgroundColor: "white",
	  borderRadius: 20,
	  padding: 20,
	  shadowColor: "#000",
	  shadowOffset: {
		width: 0,
		height: 2
	  },
	  shadowOpacity: 0.25,
	  shadowRadius: 3.84,
	  elevation: 5,
	  width: "90%"
	},
	openButton: {
	  backgroundColor: "#F194FF",
	  borderRadius: 20,
	  padding: 10,
	  elevation: 2
	},
	textStyle: {
	  color: "white",
	  fontWeight: "bold",
	  textAlign: "center"
	},
	modalText: {
	  marginBottom: 15,
	  textAlign: "center",
	  fontFamily: "Bold"
	},
	categoryContainer: {
	  width: "100%",
	  flexDirection: "row",
	  marginTop: 10,
	  marginBottom: 15
	},
  
	categoryText: {
	  color: "grey",
	  borderRadius: 2,
	  borderColor: "#F9C227",
	  paddingBottom: 5,
	  marginHorizontal: 6,
	  fontFamily: "Bold"
	},
  
	SelectedcategoryText: {
	  color: "#922305",
	  borderBottomWidth: 3,
	  borderRadius: 2,
	  borderColor: "#F9C227",
	  paddingBottom: 5,
	  marginHorizontal: 6,
	  fontFamily: "Bold"
	}
  });
  