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
import { SimpleLineIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

export default function StoreSetting({ route, navigation }) {
  const [isLoading, SetLoading] = useState(false);
  const [checked, setChecked] = React.useState("first");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [url, setURL] = useState("");
  const [tax_number, setTax] = useState("");
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
      formData.append("token", user_token);
      fetch("https://stakfort.com/tailor/api/get_store.php", {
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
          setName(json.data.name);
          setPhone(json.data.contact_number);
          setEmail(json.data.contact_email);
          setURL(json.data.url);
          setTax(json.data.tax_number);
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  const store_info = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("tailor_token", user_token);
    formData.append("contact_number", phone);
    formData.append("email", email);
    formData.append("url", url);
    formData.append("tax_number", tax_number);
    formData.append("type", checked);
    SetLoading(true);
    fetch("https://stakfort.com/tailor/api/store_info.php", {
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
          alert(responseJson.data.message);
          navigation.navigate("StoreLocation");

        } else {
          alert(responseJson.data.message);
          SetLoading(false);
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
                fontFamily: "ExtraBold",
                color: "#FFF",
                fontSize: 20
              }}
            >
              تغيير ملف المتجر
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10, paddingTop: 25 }}>
          <Text style={{ fontFamily: "Bold", fontSize: 18, marginBottom: 20 }}>
            تفاصيل المتجر :
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <TextInput
            defaultValue={data.name}
            onChangeText={name => setName(name)}
            placeholder="أسم المتجر"
            style={{
              height: 40,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderColor: "grey",
              width: "100%",
              fontFamily: "Bold",
              color: "grey",
              marginBottom: 25
            }}
          />

          <TextInput
            defaultValue={data.contact_number}
            onChangeText={phone => setPhone(phone)}
            placeholder="رقم تواصل المتجر"
            style={{
              height: 40,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderColor: "grey",
              width: "100%",
              fontFamily: "Bold",
              color: "grey",
              marginBottom: 25,
              textAlign: "right"
            }}
          />

          <TextInput
            defaultValue={data.contact_email}
            onChangeText={email => setEmail(email)}
            placeholder="البريد الألكتروني"
            style={{
              height: 40,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderColor: "grey",
              width: "100%",
              fontFamily: "Bold",
              color: "grey",
              marginBottom: 25,
              textAlign: "right"
            }}
          />

          <TextInput
            onChangeText={url => setURL(url)}
            defaultValue={data.url}
            placeholder="رابط الموقع"
            style={{
              height: 40,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderColor: "grey",
              width: "100%",
              fontFamily: "Bold",
              color: "grey",
              marginBottom: 25,
              textAlign: "right"
            }}
          />

        <TextInput
              onChangeText={tax => setTax(tax)}
              defaultValue={data.tax_number}
              placeholder="الرقم الضريبي"
              style={{
                height: 40,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderColor: "grey",
                width: "100%",
                fontFamily: "Bold",
                color: "grey",
                marginBottom: 25,
                textAlign: "right"
              }}
            />

        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 50 }}>
          <View>
            <Text
              style={{
                fontFamily: "ExtraBold",
                color: "grey",
                marginBottom: 20
              }}
            >
              التطريز خاص ب
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>الرجال</Text>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>النساء</Text>

              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => setChecked("second")}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>الرجال و النساء</Text>
              <RadioButton
                value="third"
                status={checked === "third" ? "checked" : "unchecked"}
                onPress={() => setChecked("third")}
              />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => store_info()}
            style={{
              backgroundColor: "#F9C227",
              paddingVertical: 15,
              borderRadius: 10,
              width: "100%"
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
  }
});
