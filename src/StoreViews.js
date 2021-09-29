import React, { useState } from 'react';
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
export default function StoreViews({ route, navigation }) {
	return (
		<ScrollView>
			<View style={{ flex: 1 }}>
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
					<TouchableOpacity onPress={() => navigation.navigate("Home")} >
						<SimpleLineIcons name="arrow-right" size={30} color="#FFF" 
						style={{ marginHorizontal: 15 }} />
						</TouchableOpacity>
					</View>
					
					<View style={{ justifyContent: 'center' }}>
						<Text
							style={{
								textAlign: 'center',
								fontFamily: 'ExtraBold',
								color: '#FFF',
								fontSize: 20
							}}
						>
							مشاهدات المتجر
						</Text>
					</View>

					
				</View>    

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                    
                  <Image source={require('./../assets/snap.png')}/>
                  <Text style={{ fontFamily: 'Bold', color:"grey"}}>
                      لم يتم العثور علي مشاهدات
                  </Text>
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
