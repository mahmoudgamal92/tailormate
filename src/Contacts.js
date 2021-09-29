import React, { useEffect } from "react";
import * as Contacts from "expo-contacts";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  TextInput,
  FlatList
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
export default function Contactss({ route, navigation }) {
  const [contacts, setContacts] = React.useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync();
        setContacts(data);

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }
      }
    })();
  }, []);
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#922305",
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
            onPress={() => navigation.navigate("Clients")}
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
              جهات الأتصال
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10, paddingTop: 25 }}>
          <Text style={{ fontFamily: "Bold", fontSize: 18, marginBottom: 20 }}>
            جهات الأتصال :
          </Text>
        </View>

        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 10
          }}
          data={contacts}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AddClientFromContact", {
                    number: item.phoneNumbers[0].number,
                    contact_name: item.name
                  })}
                style={{
                  flexDirection: "row",
                  height: 60,
                  borderWidth: 1,
                  borderColor: "black",
                  marginHorizontal: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  marginBottom: 10
                }}
              >
                <View
                  style={{
                    width: "20%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <AntDesign name="arrowleft" size={30} color="black" />
                </View>

                <View style={{ width: "60%", paddingRight: 10 }}>
                  <Text
                    style={{
                      fontFamily: "Bold",
                      textAlign: "right",
                      color: "#922305"
                    }}
                  >
                    {item.name}
                  </Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <AntDesign name="contacts" size={30} color="grey" />
                </View>
              </TouchableOpacity>
            );
          }}
        />
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
