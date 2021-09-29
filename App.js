import React from 'react';
import { StyleSheet, Text, View,AsyncStorage,I18nManager  } from 'react-native';
import { useFonts } from 'expo-font';
import {
	AntDesign,
	FontAwesome5,
	FontAwesome,
	MaterialIcons,
	MaterialCommunityIcons,
	Feather
} from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from './CustomDrawer';
import SignIn from './src/SignIn';
import SignUp from './src/SignUp';
import Home from './src/Home';
import Print from './src/Print';

import Clients from './src/Clients';
import AddClient from './src/AddClient';
import AddClientFromContact from './src/AddClientFromContact';

import AddOrder from './src/AddOrder';
import OrderDetails from './src/OrderDetails';

import Charts from './src/Charts';
import TaskManagment from './src/TaskManagment';
import StoreSetting from './src/StoreSetting';
import StoreLocation from './src/StoreLocation';

import ClientsRecord from './src/ClientsRecord';
import StoreViews from './src/StoreViews';
import BackUp from './src/BackUp';

import Contact from './src/Contact';
import Profile from './src/Profile';
import Logout from './src/Logout';

import SubGallery from './src/SubGallery';
import Splash from './src/Splash';
import Client from './src/Client';
import Body from './src/Body';
import Settings from './src/Settings';
import Contacts from './src/Contacts';
import Test from './src/Test';

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

export default function App() {
	const LoadStack = createStackNavigator();
	const HomeStack = createStackNavigator();
	const Drawer = createDrawerNavigator();
//	const [isLoading, setLoading] = useState(true);


	let [fontsLoaded] = useFonts({
		Bold: require('./assets/fonts/Almarai-Bold.ttf'),
		ExtraBold: require('./assets/fonts/Almarai-ExtraBold.ttf'),
		Light: require('./assets/fonts/Almarai-Light.ttf'),
		Regular: require('./assets/fonts/Almarai-Regular.ttf')
	});
	if (!fontsLoaded) {
		return null;
	}


	const AppStackScreen = ({ navigation }) =>
			
		<HomeStack.Navigator headerMode="none">
			<HomeStack.Screen name="Splash" component={Splash} />
			<HomeStack.Screen name="Home" component={Home} />
			<HomeStack.Screen name="SignIn" component={SignIn} />
			<HomeStack.Screen name="SignUp" component={SignUp} />
			<HomeStack.Screen name="Clients" component={Clients} />
			<HomeStack.Screen name="AddClient" component={AddClient} />
			<HomeStack.Screen name="AddClientFromContact" component={AddClientFromContact} />
			<HomeStack.Screen name="AddOrder" component={AddOrder} />
			<HomeStack.Screen name="OrderDetails" component={OrderDetails} />
			<HomeStack.Screen name="Charts" component={Charts} />
			<HomeStack.Screen name="TaskManagment" component={TaskManagment} />
			{/* Drawer Pages */}
			<HomeStack.Screen name="StoreSetting" component={StoreSetting} />
			<HomeStack.Screen name="ClientsRecord" component={ClientsRecord} />
			<HomeStack.Screen name="Test" component={Test} />
			<HomeStack.Screen name="Print" component={Print} />
			<HomeStack.Screen name="StoreLocation" component={StoreLocation} />
			<HomeStack.Screen name="SubGallery" component={SubGallery} />
			<HomeStack.Screen name="Client" component={Client} />
			<HomeStack.Screen name="Body" component={Body} />

			<HomeStack.Screen name="Contacts" component={Contacts} />

		</HomeStack.Navigator>;

	return (
		<NavigationContainer>
			<Drawer.Navigator drawerPosition="right" drawerContent={props => <CustomDrawer {...props} />}>
				<Drawer.Screen
					name="HomePage"
					component={AppStackScreen}
					options={{
						title: () => <Text style={{ color: 'black', fontFamily: 'ExtraBold' }}>الطلبات</Text>,

						drawerIcon: ({ focused, size }) =>
							<FontAwesome name="shopping-basket" size={30} color="black" />
					}}
				/>

				<Drawer.Screen
					name="StoreSetting"
					component={StoreSetting}
					options={{
						title: () => <Text style={{ color: 'black', fontFamily: 'ExtraBold' }}>ادارة المتجر</Text>,
						drawerIcon: ({ focused, size }) => <FontAwesome5 name="store" size={30} color="black" />
					}}
				/>

				<Drawer.Screen
					name="ClientsRecord"
					component={ClientsRecord}
					options={{
						title: () => <Text style={{ color: 'black', fontFamily: 'ExtraBold' }}>سجل العملاء</Text>,
						drawerIcon: ({ focused, size }) => <AntDesign name="contacts" size={30} color="black" />
					}}
				/>

				{
				/* <Drawer.Screen
					name="ClientsRecord1"
					component={ClientsRecord}
					options={{
						title: () => <Text style={{ color: 'black', fontFamily: 'ExtraBold' }}>المشرفين</Text>,
						drawerIcon: ({ focused, size }) => <FontAwesome name="users" size={30} color="black" />
					}}
				/> */
				}

				<Drawer.Screen
					name="StoreViews"
					component={StoreViews}
					options={{
						title: () => <Text style={{ color: 'black', fontFamily: 'ExtraBold' }}>مشاهدات المتجر</Text>,
						drawerIcon: ({ focused, size }) => <AntDesign name="shoppingcart" size={30} color="black" />
					}}
				/>

				<Drawer.Screen
					name="BackUp"
					component={BackUp}
					options={{
						title: () => <Text style={{ color: 'black', fontFamily: 'ExtraBold' }}>استيراد البيانات</Text>,
						drawerIcon: ({ focused, size }) =>
							<MaterialCommunityIcons name="backup-restore" size={30} color="black" />
					}}
				/>

				<Drawer.Screen
					name="ClientsRecord4"
					component={Settings}
					options={{
						title: () => <Text style={{ color: 'black', fontFamily: 'ExtraBold' }}>الأعدادات</Text>,
						drawerIcon: ({ focused, size }) => <Feather name="settings" size={30} color="black" />
					}}
				/>

				<Drawer.Screen
					name="Profile"
					component={Profile}
					options={{
						title: () => <Text style={{ color: 'black', fontFamily: 'ExtraBold' }}>حسابي</Text>,
						drawerIcon: ({ focused, size }) =>
							<MaterialIcons name="account-circle" size={30} color="black" />
					}}
				/>

				<Drawer.Screen
					name="Contact"
					component={Contact}
					options={{
						title: () =>
							<Text style={{ color: 'black', fontFamily: 'ExtraBold' }}>تواصل مع فريق الدعم</Text>,
						drawerIcon: ({ focused, size }) =>
							<MaterialCommunityIcons name="chat-outline" size={30} color="black" />
					}}
				/>

				<Drawer.Screen
					name="Logout"
					component={Logout}
					options={{
						title: () => <Text style={{ color: '#922305', fontFamily: 'ExtraBold' }}>تسجيل الخروج</Text>,
						drawerIcon: ({ focused, size }) =>
							<MaterialCommunityIcons name="logout" size={30} color="#922305" />
					}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
}