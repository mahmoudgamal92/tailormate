import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, AsyncStorag } from 'react-native';
import {
	SimpleLineIcons,AntDesign
} from '@expo/vector-icons';
import Constants from 'expo-constants';
export default function SubGallery({ route, navigation }) {
return (
    <ScrollView>
    <View style={{ flex: 1 }}>
               <View style={{
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
					<Text style={{ fontFamily: 'ExtraBold', color: '#FFF' }}>
                      الثياب السعودية
                        </Text>
				</View>
			</View>

        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
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
                        ثوب سعودي أزرق
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
                        ثوب سعودي أبيض
                    </Text>
                </View>
            </TouchableOpacity>
        </View>





    </View>
    </ScrollView>
);

}