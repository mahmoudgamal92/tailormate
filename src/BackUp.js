import React, { useState } from "react";
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
import { RadioButton, Switch } from "react-native-paper";

export default function BackUp({ route, navigation }) {
  const [checked, setChecked] = React.useState("first");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
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
          <TouchableOpacity onPress={() => navigation.navigate("Home")} >

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
              النسخ الأحتياطي
            </Text>
          </View>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              color: "grey",
              paddingHorizontal: 20,
              marginTop: 20
            }}
          >
            يمكنك استخدام هذة الأداه لتهيئة استعادة بياناتك , التطبيق سيقوم
            باستعادتها كليا و يمكنك ارسال بياناتك بصيغة اكسيل علي بريدك
            الألكتروني أو رفعها علي تطبيق سحابي
          </Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 10,
            marginTop: 100
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderColor: "black",
              borderBottomWidth: 1,
              paddingBottom: 5
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "ExtraBold" }}>مفعل</Text>
            </View>
          </View>

          <View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontFamily: "Bold" }}>زمن استعادة النسخ</Text>
            </View>
            <View
              style={{
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>يوميا</Text>
                <RadioButton
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                />
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>أسبوعيا</Text>

                <RadioButton
                  value="second"
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked("second")}
                />
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>شهريا</Text>
                <RadioButton
                  value="third"
                  status={checked === "third" ? "checked" : "unchecked"}
                  onPress={() => setChecked("third")}
                />
              </View>
            </View>
          </View>

          <View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontFamily: "Bold" }}>صيغة النسخه الأحتياطية</Text>
            </View>
            <View
              style={{
                flexDirection: "row-reverse",
                justifyContent: "space-around"
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>ارسال الي البريد</Text>
                <RadioButton
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                />
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>رفع علي تخزين سحابي</Text>

                <RadioButton
                  value="second"
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked("second")}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 100 }}>
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
              جدولة النسخ الأحتياطي
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
