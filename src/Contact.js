import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Linking
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
export default function StoreViews({ route, navigation }) {
  const message =
    "Hello From Tailor Mate App This Is Frist App For Tailor In THe Kingdom";
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
              تواصل مع فريق الدعم
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "whatsapp://send?text=" + message + "&phone=+201063634580"
            )}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderColor: "grey",
            borderBottomWidth: 1,
            marginHorizontal: 10,
            paddingBottom: 5,
            marginTop: 10
          }}
        >
          <View style={{ paddingHorizontal: 15 }}>
            <FontAwesome5 name="whatsapp" size={50} color="green" />
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <Text style={{ fontFamily: "Bold", color: "grey", fontSize: 20 }}>
              +3794794804749
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:support@example.com")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderColor: "grey",
            borderBottomWidth: 1,
            marginHorizontal: 10,
            paddingBottom: 5,
            marginTop: 10
          }}
        >
          <View style={{ paddingHorizontal: 15 }}>
            <Entypo name="mail" size={50} color="red" />
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <Text style={{ fontFamily: "Bold", color: "grey", fontSize: 20 }}>
              m.tailor@info.com
            </Text>
          </View>
        </TouchableOpacity>
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
