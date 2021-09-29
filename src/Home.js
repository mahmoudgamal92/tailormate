import React, { Component, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  AsyncStorage,
  FlatList,
  RefreshControl,
  BackHandler,
   Alert
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  FontAwesome5,
  Entypo,
  FontAwesome,
  Fontisto,
  Foundation
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Constants from "expo-constants";
import LottieView from 'lottie-react-native';
// bottom tabs

import Gallery from "./Gallery";
import Tasks from "./Tasks";
import Reports from "./Reports";

function Home({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = React.useState(false);

  const [selected, SetSelected] = React.useState(1);
  const [status, SetStatus] = React.useState('active');
  const [cat_title, SetTitle] = React.useState('نشط الأن :');
  
  const [user_name, setUserName] = React.useState("");
  const [user_token, setUserToken] = React.useState("");

  const [data, setData] = useState([]);

  // this is how to us async in functional component
  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const user_name = await AsyncStorage.getItem("user_name");
      const user_token = await AsyncStorage.getItem("user_token");
      setUserName(user_name);
      setUserToken(user_token);
      let formData = new FormData();
      formData.append("tailor_token", user_token);
      formData.append("status", status);
      setLoading(true);
      fetch("https://stakfort.com/tailor/api/orders.php", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        },
        body: formData
      })
        .then(response => response.json())
        .then(json => {
          setData(json.data);
        })
        .finally(() => setLoading(false))
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  
  const backAction = () => {

    if(route.name == "Home")

    {
    Alert.alert('تأكيد الخروج!', 'هل أنت متأكد من مغادرة التطبيق ؟', [
      {
        text: 'لا',
        onPress: () => null,
        style: 'fontFamily: "Bold"',
      },
      { text: 'خروج', onPress: () => BackHandler.exitApp() },
    ]);
    //return true;
  }

  else{
    navigation.goBack();
  }
      return true;
  };
  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    //return () => backHandler.remove();


  const get_categorey = (selected,status,title) => {
    SetSelected(selected);
    SetStatus(status);
    SetTitle(title);

    let formData = new FormData();
        formData.append("tailor_token", user_token);
        formData.append("status", status);
      setLoading(true);
      fetch("https://stakfort.com/tailor/api/orders.php", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-type": "multipart/form-data;",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive"
        },
        body: formData
      })
        .then(response => response.json())
        .then(json => {
          setData(json.data);
        })
        .finally(() => setLoading(false))
        .catch(error => console.error(error));
    } 
  

    const _handleEmptyFlatList = () => {
      return (
          <View style={{ flex: 1,justifyContent: "center",alignItems: "center" }}>
          <Image source={require('./../assets/snap.png')}/>
                  <Text style={{ fontFamily: 'Bold', color:"grey"}}>
                   لم يتم العثور علي طلبات
                  </Text>
          </View>
      )
  }


  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: Constants.statusBarHeight * 1.5,
          backgroundColor: "#922305",
          height: 120,
          top: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10
        }}
      >
      
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Fontisto name="right-align" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "ExtraBold",
              color: "#FFF",
              marginLeft: 10
            }}
          >
            قائمة الطلبات
          </Text>
         
        </View>


        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <Text style={{ fontFamily: "Bold", color: "#F9C227" }}>
            مرحبا, {user_name}
          </Text>
        </View>

      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
       
          <TouchableOpacity activeOpacity={0.8} onPress={() => get_categorey(1,'active','نشط الأن :')}>
            <Text
              style={
                selected == 1
                  ? styles.SelectedcategoryText
                  : styles.categoryText
              }
            >
              نشط الأن
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() =>  get_categorey(2,'overdue','طلبات تجاوزت الموعد  :')}>
            <Text
              style={
                selected == 2
                  ? styles.SelectedcategoryText
                  : styles.categoryText
              }
            >
              تجاوز الموعد
            </Text>
          </TouchableOpacity>


          <TouchableOpacity activeOpacity={0.8} onPress={() => get_categorey(3,'coming','الطلبات القادمة :')}>
            <Text
              style={
                selected == 3
                  ? styles.SelectedcategoryText
                  : styles.categoryText
              }
            >
              قادم
            </Text>
          </TouchableOpacity>



          <TouchableOpacity activeOpacity={0.8} onPress={() =>  get_categorey(4,'complete','الطلبات المكتملة :')}>
            <Text
              style={
                selected == 4
                  ? styles.SelectedcategoryText
                  : styles.categoryText
              }
            >
              مكتمل
            </Text>
          </TouchableOpacity>


          <TouchableOpacity activeOpacity={0.8} onPress={() =>  get_categorey(5,'urgent','الطلبات العاجلة :')}>
            <Text
              style={
                selected == 5
                  ? styles.SelectedcategoryText
                  : styles.categoryText
              }
            >
              عاجل
            </Text>
          </TouchableOpacity>


          <TouchableOpacity activeOpacity={0.8} onPress={() =>  get_categorey(6,'delivered','الطلبات التي تم توصيلها:')}>
            <Text
              style={
                selected == 6
                  ? styles.SelectedcategoryText
                  : styles.categoryText
              }
            >
              تم التوصيل
            </Text>
          </TouchableOpacity>

        


        </ScrollView>
        <View
          style={{
            marginHorizontal: 10,
            borderTopWidth: 1,
            elevation: 2,
            borderColor: "grey"
          }}
        />
      </View>

      <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
        <Text style={{ fontFamily: "Bold", textAlign: "auto", color: "grey" }}>
         {cat_title}
        </Text>
      </View>

      {isLoading == true ?
      (
        <View style={{flex: 1,
        justifyContent:"center",
        alignItems:"center",
         }}>
        		<View style={{ alignSelf: 'center' }}>
              <LottieView
             autoPlay
                style={{
                  width: 100,
                  height: 100,
                }}
                source={require('./../assets/load.json')}
                />
              </View>
        </View>
      ) : (

      <FlatList
        scrollEnabled={true}
        contentContainerStyle={{
          width: "100%",
          paddingHorizontal: 20,
          paddingBottom: 10,
          paddingTop: 5
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={_retrieveData} />
        }
        data={data}
        keyExtractor={(item, index) => item.order_id}
        ListEmptyComponent={_handleEmptyFlatList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
            onPress={() => navigation.navigate("OrderDetails",{
              order_id:item.order_id
            })}
              style={{
                flexDirection: "row",
                height: 152,
                borderWidth: 1,
                borderColor: "#922305",
                marginHorizontal: 10,
                borderRadius: 10,
                alignItems: "center",
                marginBottom: 20
              }}
             >
                 <View style={{ width: "40%" }}>
                <Image
                  style={{
                    width: "100%",
                    maxHeight: 150,
                    borderBottomRightRadius: 15,
                    borderTopRightRadius: 15
                  }}
                  source={require("./../assets/body/face.png")}
                />
              </View>

              <View style={{ width: "60%", paddingLeft: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="account"
                      size={20}
                      color="grey"
                    />
                    <Text
                      style={{
                        fontFamily: "Bold",
                        textAlign: "right",
                        marginLeft: 10
                      }}
                    >
                      {item.client_name}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontFamily: "Regular",
                      textAlign: "right",
                      marginHorizontal: 10,
                      color: "grey"
                    }}
                  >
                    #{item.order_id}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Foundation name="dollar-bill" size={24} color="grey" />
                  <Text
                    style={{
                      fontFamily: "Bold",
                      textAlign: "right",
                      marginLeft: 10
                    }}
                  >
                    {item.price} رس
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <FontAwesome5 name="tshirt" size={20} color="grey" />
                  <Text
                    style={{
                      fontFamily: "Bold",
                      textAlign: "right",
                      marginLeft: 10
                    }}
                  >
                  {item.custom_type}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                <MaterialIcons name="date-range" size={24} color="grey" />
                  <Text
                    style={{
                      fontFamily: "Bold",
                      textAlign: "right",
                      marginLeft: 10
                    }}
                  >
                  {item.deliver_date}
                  </Text>
                </View>
          
              </View>
            
            </TouchableOpacity>
          );
        }}
      />)}

      <TouchableOpacity
        onPress={() => navigation.navigate("Clients")}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#922305",
          position: "absolute",
          bottom: 30,
          right: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Entypo name="plus" size={30} color="#FFF" />
      </TouchableOpacity>
      {/* </View>
			</ImageBackground> */}
    </View>
  );
}
const Tabs = createBottomTabNavigator();
export default function App() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#922305"
      }}
      barStyle={{ backgroundColor: "#FFF" }}
    >
     



    
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ color, size }) =>
            <Text style={{ fontFamily: "Bold", color }}>الطلبات</Text>,
          tabBarIcon: ({ color, size }) =>
            <FontAwesome name="shopping-basket" size={30} color={color} />
        }}
      />

    <Tabs.Screen
            name="Tasks"
            component={Tasks}
            options={{
              tabBarLabel: ({ color, size }) =>
                <Text style={{ fontFamily: "Bold", color }}>المهام</Text>,
              tabBarIcon: ({ color, size }) =>
                <FontAwesome5 name="tasks" size={30} color={color} />
            }}
          />


    <Tabs.Screen
            name="Gallery"
            component={Gallery}
            options={{
              tabBarLabel: ({ color, size }) =>
                <Text style={{ fontFamily: "Bold", color }}>المعرض</Text>,
              tabBarIcon: ({ color, size }) =>
                <Feather name="image" size={30} color={color} />
            }}
          />

    <Tabs.Screen
            name="Reports"
            component={Reports}
            options={{
              tabBarLabel: ({ color, size }) =>
                <Text style={{ fontFamily: "Bold", color }}>التقارير</Text>,

              tabBarIcon: ({ color, size }) =>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={30}
                  color={color}
                />
            }}
          />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
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
