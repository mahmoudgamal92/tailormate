import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  TextInput,
  ActivityIndicator
} from "react-native";
import { Ionicons,SimpleLineIcons } from "@expo/vector-icons";
export default function Body({ route, navigation }) {
  const { token,id,full_name } = route.params;
  const [isLoading, SetLoading] = useState(false);

  const [data, setData] = useState([]);

  const [length, set_length] = useState("");
  const [width, set_width] = useState("");
  const [floor_width, set_floor_width] = useState("");
  const [shoulder, set_shoulder] = useState("");
  const [hand, set_hand] = useState("");  
  const [hand_width, set_hand_width] = useState("");
  const [neck, set_neck] = useState("");
  const [sadah, set_sadah] = useState("");
  const [kalab, set_kalab] = useState("");
  const [cup, set_cup] = useState("");
  const [cup_width, set_cup_width] = useState("");
  const [cup_type, set_cup_type] = useState("");

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      // const user_token = await AsyncStorage.getItem("user_token");
      // setUserToken(user_token);
      let formData = new FormData();
      formData.append("token", token);
      fetch("https://stakfort.com/tailor/api/get_body.php", {
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
          set_length(json.data.length);
          set_width(json.data.width);
          set_floor_width(json.data.floor_width);
          set_shoulder(json.data.shoulder);
          set_hand(json.data.hand);
          set_hand_width(json.data.hand_width);
          set_neck(json.data.neck);
          set_kalab(json.data.kalab);
          set_sadah(json.data.sadah);
          set_cup(json.data.cup);
          set_cup_width(json.data.cup_width);
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  const Update_body = () => {
    let formData = new FormData();
      formData.append("token", token);
      formData.append("length", length);
      formData.append("width", width);
      formData.append("floor_width", floor_width);
      formData.append("shoulder", shoulder);
      formData.append("hand", hand);
      formData.append("hand_width", hand_width);
      formData.append("neck", neck);
      formData.append("kalab", kalab);
      formData.append("sadah", sadah);
      formData.append("cup", cup);
      formData.append("cup_width", cup_width);
      SetLoading(true);
    fetch("https://stakfort.com/tailor/api/edit_body.php", {
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
      .then(responseJson => {
        if (responseJson.success == true) {
          SetLoading(false);
          alert(responseJson.message);
          navigation.navigate("Client",{
            id:id
          });
        } else {
          SetLoading(false);
          alert(responseJson.message);
        }
      });
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
            onPress={() => navigation.navigate("ClientsRecord")}
            >
          <SimpleLineIcons
            name="arrow-right"
            size={30}
            color="#FFF"
            style={{ marginHorizontal: 10 }}
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
          قياسات الجسم
          </Text>
        </View>
      </View>
        <View style={{ paddingHorizontal: 10 }}>
          <View>
            <Text
              style={{
                fontFamily: "Bold",
                marginVertical: 10,
                fontSize: 20
              }}
            >
             {full_name}
            </Text>
            <Text
              style={{
                fontFamily: "Regular",
                textAlign: "justify",
                fontSize: 15,
                marginBottom: 30
              }}
            >
              قياسات كل الجسم
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>
                الطول
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                onChangeText={length => set_length(length)}
                defaultValue={data.length}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>الوسع</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                defaultValue={data.width}
                onChangeText={width => set_width(width)}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}> الكتف</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                onChangeText={shoulder => set_shoulder(shoulder)}
                defaultValue={data.shoulder}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>اليد </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                onChangeText={hand => set_hand(hand)}
                defaultValue={data.hand}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}> الرقبة</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                onChangeText={neck => set_neck(neck)}
                defaultValue={data.neck}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>سادة</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                onChangeText={sadah => set_sadah(sadah)}
                defaultValue={data.sadah}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}> قلاب</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                defaultValue={data.kalab}
                onChangeText={kalab => set_kalab(kalab)}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>وسع اليد</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
               onChangeText={hand_width => set_hand_width(hand_width)}
                defaultValue={data.hand_width}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>وسع الكبك</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
              onChangeText={cup_width => set_cup_width(cup_width)}
                defaultValue={data.cup_width}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}> الكبك</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
               onChangeText={cup => set_cup(cup)}
                defaultValue={data.cup}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "grey",
              borderBottomWidth: 1.5,
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>وسع تحت</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
              onChangeText={floor_width => set_floor_width(floor_width)}
                defaultValue={data.floor_width}
                keyboardType="numeric"
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4,
                  textAlign: "right"
                }}
              />
            </View>
          </View>

          <TouchableOpacity
          	onPress={() => Update_body()}
            style={{
              backgroundColor: "#F9C227",
              paddingVertical: 15,
              borderRadius: 10,
              width: "100%",
              marginTop: 20
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
               تعديل البيانات الحالية
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
  }
});
