import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  FlatList,
  Alert,
  Linking,
  TextInput
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons,
  Feather
} from "@expo/vector-icons";
import Constants from "expo-constants";
import LottieView from 'lottie-react-native';

export default function StoreSetting({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [user_token, setUserToken] = useState("");

  const [data, setData] = useState([]);
  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      setUserToken(user_token);
      let formData = new FormData();
      formData.append("tailor_token", user_token);

      fetch("https://stakfort.com/tailor/api/clients.php", {
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


  const createThreeButtonAlert = () =>
  Alert.alert(
    "هل أنت متأكد من حذف هذا العميل ؟!",
    "سيترتب علي ذلك حذف جميع الطلبات و البيانات و القياسات الخاصة بهذ العميل !",
    [
      {
        text: "الغاء",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "تأكيد الحذف",
        onPress: () => alert("تم !"),
        style: "cancel",
      },
    ],
    { cancelable: false }
  );

  const Search_val = (search_param) => {
    let formData = new FormData();
   formData.append("token", user_token);
    formData.append("search_param", search_param);
    setLoading(true);
    fetch("https://stakfort.com/tailor/api/search.php", {
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

  return (
   
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#5B5B5B",
            paddingVertical: 20,
            height: 120,
            top: 0,
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingHorizontal: 10,
            alignItems: "center"
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            >
            <SimpleLineIcons
              name="arrow-right"
              size={30}
              color="#FFF"
              style={{ marginHorizontal:10 }}
            />
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "ExtraBold",
                color: "#FFF",
                fontSize: 20
              }}
            >
              سجل العملاء
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10, paddingTop: 15 }}>
          <Text style={{ fontFamily: "Bold", fontSize: 18, marginBottom: 10 }}>
            قائمة العملاء
          </Text>
        </View>

        <View style={styles.SearchboxContainer}>
          <TextInput
            placeholder="أبحث في العملاء..."
            returnKeyType='search'
            placeholderTextColor="#666"
            style={styles.Searchbox}
           onChangeText ={(search_param) => Search_val(search_param)}
            //onSubmitEditing={Search}
          />
          <TouchableOpacity
            style={styles.SearchboxIcon}
          >
            <Feather name="search" size={22} color="#666" />
          </TouchableOpacity>
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
                source={require('./../assets/load_secondry.json')}
                />
              </View>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{
            width: "100%",
            paddingHorizontal: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}
          data={data}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  height: 122,
                  borderColor: "black",
                  borderWidth: 1,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  marginBottom: 20
                }}
              >
                <View style={{ width: "40%" }}>
                  <Image
                    source={{
                      uri: 'https://stakfort.com/tailor/uploads/clients/'+item.face_img,
                    }}
                    
                    style={{
                      width: "100%",
                      height: 120,
                      borderBottomRightRadius: 15,
                      borderTopRightRadius: 15
                    }}
                  
                  />
                  
                </View>
                  <TouchableOpacity
                   style={{ width: "40%", paddingLeft: 10 }}
                    onPress={() =>
                      navigation.navigate("Client", {
                        id: item.id,
                        token: item.client_token
                      })}
                  >
                   <View>

                    <Text style={{ fontFamily: "Bold", textAlign: "center" }}>
                      {item.full_name }
                    </Text>
                    <Text style={{ fontFamily: "Bold",textAlign:"center",}}>
                      {item.phone.replace(/\s/g, '').replace("+","")}
                    </Text>
                    </View>

                  </TouchableOpacity>

                <View
                  style={{
                    width: "20%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <TouchableOpacity
                 onPress={() => createThreeButtonAlert(item.client_token)}
                  >
                    <MaterialCommunityIcons
                      name="delete-forever"
                      size={50}
                      color="red"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
      </View>
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
  SearchboxContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 10,
    borderRadius: 4,
    marginBottom:10,
  },
  Searchbox: {
    padding: 12,
    fontSize: 16,
    fontFamily:"Bold",
    paddingHorizontal:60,
    height:60
    },
  SearchboxIcon: {
    position: "absolute",
    right: 20,
    top: 14
  }
});
