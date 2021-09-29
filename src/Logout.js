import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, AsyncStorage, TextInput } from 'react-native';
import {
	AntDesign,
	MaterialCommunityIcons,
	MaterialIcons,
	Feather,
	FontAwesome5,
	Entypo,
	FontAwesome,
	Ionicons,
	SimpleLineIcons
} from '@expo/vector-icons';
export default function Logout({ route, navigation }) {
	const [data, setData] = useState([]);
    const [name, setName] = useState("");

	useEffect(() => {
		_retrieveData();
	}, []);

	const _retrieveData = async () => {
		try {
		  const user_name = await AsyncStorage.getItem("user_name");
             setName(user_name);
			} catch (error) {
		  console.log(error);
		}
	  };

          // LogOut Function
    const _removeSession = async () => {
        try {
          await AsyncStorage.removeItem("user_token");
          await AsyncStorage.removeItem("user_id");
          await AsyncStorage.removeItem("user_name");
          navigation.navigate("SignIn");
        }
        catch (error) {
          console.log(error);
          alert("Erorr : " + error)
        }
      }
	return (
		<ScrollView>
			<View style={{ flex: 1}}>
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
						<SimpleLineIcons name="arrow-right" size={30} color="#FFF" style={{ marginHorizontal: 15 }} />
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
						تسجيل الخروج
						</Text>
					</View>

					
				</View>

				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						borderColor: 'grey',
						borderBottomWidth: 1,
						marginBottom: 10,
						marginHorizontal: 20,
                        marginTop:30
					}}
				>
					<Image
						source={require('./../assets/power.png')}
						style={{
							width: 150,
							height: 150,
							resizeMode: 'contain'
						}}
					/>
					<Text style={{ fontFamily: 'Bold', color: 'black',fontSize: 20,marginVertical:10,color:"grey"}}>
                      مرحبا , {name}
                    </Text>
				</View>
                <View style={{marginTop:50,paddingHorizontal:10}}>
                    <Text style={{ fontFamily:'Bold',textAlign: 'center',fontSize:15,color:"#922305" }}>
                       
                        هل أنت متأكد من تسجيل الخروج من التطبيق ؟
                            لابد أن تكون متذكر جيدا كل بياناتك 
                            للدخول الي حسابك مجددا
                    </Text>
                </View>


                <View style={{ justifyContent: 'center',marginHorizontal: 20,marginTop: 60}}>
                <TouchableOpacity
           onPress={() => _removeSession()}
            style={{
              backgroundColor: "#F9C227",
              paddingVertical: 15,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                 fontFamily: "Bold",
              }}
            >
       تسجيل الخروج
          </Text>
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
