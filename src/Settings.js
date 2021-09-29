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
import { RadioButton, Switch, ToggleButton } from "react-native-paper";

export default function Setting({ route, navigation }) {
  const [checked, setChecked] = React.useState("first");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [value, setValue] = React.useState("left");

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
              الأعدادات
            </Text>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 10,
            marginTop: 40
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderColor: "black",
              paddingBottom: 5
            }}
          >
            <View style={{ alignItems: "center" }}>
              <ToggleButton.Row
                onValueChange={value => setValue(value)}
                value={value}
              >
                <ToggleButton
                  style={{ width: 50 }}
                  icon={() =>
                    <View>
                      <Text style={{ color: "red", fontFamily: "Bold" }}>
                        سنتيمتر
                      </Text>
                    </View>}
                  value="left"
                />
                <ToggleButton
                  style={{ width: 50 }}
                  icon={() =>
                    <View>
                      <Text style={{ color: "red", fontFamily: "Bold" }}>
                        بوصة
                      </Text>
                    </View>}
                  value="right"
                />
              </ToggleButton.Row>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "ExtraBold" }}>وحدة القياس</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              borderColor: "black",
              paddingBottom: 5
            }}
          >
            <Text style={{ fontFamily: "Bold" }}>
              اخفاء القياسات عن العملاء
            </Text>
            <RadioButton
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
            />
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 10,
            marginTop: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderColor: "black",
              paddingBottom: 5
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                trackColor={{ true: "#922305", false: "grey" }}
                thumbColor={{ true: "#922305", false: "grey" }}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "ExtraBold" }}>فاتورة بالضريبة</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              borderColor: "grey",
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>الرقم الضريبي</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "50%"
              }}
            >
              <TextInput
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
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              borderColor: "grey",
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>نسبة الضريبة</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "50%"
              }}
            >
              <TextInput
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
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              borderColor: "black",
              paddingBottom: 5
            }}
          >
            <Text style={{ fontFamily: "Bold" }}>أظهارالضريبةعلي الفاتورة</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              trackColor={{ true: "#922305", false: "grey" }}
              thumbColor="#922305"
            />
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              borderColor: "black",
              paddingBottom: 5
            }}
          >
            <Text style={{ fontFamily: "Bold" }}>تخصيص رساله للعميل</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              trackColor={{ true: "#922305", false: "grey" }}
              thumbColor="#922305"
            />
          </View>

          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              borderColor: "black",
              paddingBottom: 5
            }}
          >
            <Text style={{ fontFamily: "Bold" }}>تخصيص لوائح</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              trackColor={{ true: "#922305", false: "grey" }}
              thumbColor="#922305"
            />
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
              حفظ الأعدادات
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
