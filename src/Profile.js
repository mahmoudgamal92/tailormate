import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  TextInput
} from "react-native";
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
} from "@expo/vector-icons";
export default function Profile({ route, navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      let formData = new FormData();
      formData.append("user_token", user_token);

      fetch("https://stakfort.com/tailor/api/profile.php", {
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
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
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
              style={{ marginHorizontal: 15 }}
            />
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Bold",
                color: "#FFF",
                fontSize: 20
              }}
            >
              الحساب الشخصي
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderColor: "grey",
            borderBottomWidth: 1,
            marginBottom: 10,
            marginHorizontal: 20,
            marginTop: 30
          }}
        >
          <Image
            source={require("./../assets/avatar.png")}
            style={{
              width: 150,
              height: 150,
              resizeMode: "contain"
            }}
          />
          <Text style={{ fontFamily: "Bold", color: "black", fontSize: 20 }}>
            {data.user_name}
          </Text>
          <Text
            style={{ fontFamily: "Light", color: "grey", marginBottom: 20 }}
          >
            عضو منذ مارس 2020
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            marginHorizontal: 20,
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            borderRadius: 5
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: "Bold",
                color: "black",
                fontSize: 16
              }}
            >
              الرصيد الحالي :
            </Text>
          </View>

          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              marginVertical: 5
            }}
          >
            <Text
              style={{ fontFamily: "Bold", color: "grey", textAlign: "right" }}
            >
              رصيدي :
            </Text>

            <Text
              style={{ fontFamily: "Bold", color: "grey", textAlign: "right" }}
            >
              00:000
            </Text>
          </View>

          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              marginVertical: 5
            }}
          >
            <Text
              style={{ fontFamily: "Bold", color: "grey", textAlign: "right" }}
            >
              تاريخ الصلاحية
            </Text>

            <Text
              style={{ fontFamily: "Bold", color: "grey", textAlign: "right" }}
            >
              20 - 6 - 2021
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            marginHorizontal: 20,
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginTop: 20,
            paddingBottom: 30,
            borderRadius: 5
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{ fontFamily: "Bold", color: "black", }}
            >
              المدفوعات
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "Bold",
              color: "grey",
              textAlign: "center",
              marginTop: 20
            }}
          >
            لا يوجد مدفوعات سابقة
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            marginHorizontal: 20,
            marginTop: 60
          }}
        >
          <TouchableOpacity
            //  onPress={this.LoginUser}
            style={{
              backgroundColor: "#F9C227",
              paddingVertical: 15,
              borderRadius: 10,
              width: "100%"
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Bold"
              }}
            >
              شراء رصيد
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
  }
});
