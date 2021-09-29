import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from "react-native";

import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function Clients({ route, navigation }) {
  return (
    <View style={{ flex: 1 }}>
       <View
        style={{
          paddingTop: Constants.statusBarHeight * 1.5,
          backgroundColor: "#922305",
          height: 120,
          top: 0,
          flexDirection: "row",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
       >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <SimpleLineIcons
              name="arrow-right"
              size={30}
              color="#FFF"
              style={{ paddingHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignContent: "center"
          }}
        >
          <Text style={{ fontFamily: "ExtraBold", color: "#FFF" }}>
            اضافة عميل
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="md-add"
            size={30}
            color="#FFF"
            style={{ marginHorizontal: 15 }}
          />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("AddClient")}
            style={{
              borderRadius: 20,
              borderColor: "grey",
              borderWidth: 1,
              width: "90%",
              paddingVertical: 30,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "ExtraBold",
                color: "#F9C227",
                textAlign: "center"
              }}
            >
              اضافة عميلا جديدا
            </Text>

            <Ionicons
              name="md-person-add"
              size={30}
              color="#F9C227"
              style={{ marginLeft: 20 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Contacts")}
            style={{
              borderRadius: 20,
              borderColor: "grey",
              borderWidth: 1,
              width: "90%",
              paddingVertical: 30,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "ExtraBold",
                color: "#F9C227",
                textAlign: "center"
              }}
            >
              أختر من جهات الأتصال
            </Text>

            <AntDesign
              name="contacts"
              size={30}
              color="#F9C227"
              style={{ marginLeft: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
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
  }
});
