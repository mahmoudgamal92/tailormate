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
  ActivityIndicator,
  Platform,
  Alert,
  Modal
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  SimpleLineIcons,
  AntDesign,
  Entypo
} from "@expo/vector-icons";
import { RadioButton, Checkbox } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddClient({ route, navigation }) {

  const {number,contact_name} = route.params;

  const [isLoading, SetLoading] = useState(false);
  const [display, SetDisplay] = useState(false);

  const [show_erorr, SetErorr] = useState(false);

  const [face_modal, setFaceModalVisible] = useState(false);
  const [body_modal, setBodyModalVisible] = useState(false);

  const [kind, setKind] = React.useState("male");
  const [user_token, setUserToken] = React.useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setBirthdate(currentDate.toString());
    console.log(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const [full_name, setFullname] = useState(contact_name);
  const [phone, setPhone] = useState(number);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [block, setBlock] = useState("");
  const [street, setStreet] = useState("");
  const [birthdate, setBirthdate] = useState("أدخل تاريخ ميلاد العميل");

  // Face Image Data
  const [FaceImg_title, setFaceImg_title] = useState("");
  const [FaceImg_uri, setFaceImg_uri] = useState(
    "https://stakfort.com/tailor/uploads/clients/face.png"
  );
  const [FaceImg_type, setFaceImg_type] = useState(null);
  // Body Image Data
  const [BodyImg_title, setBodyImg_title] = useState("");
  const [BodyImg_uri, setBodyImg_uri] = useState(
    "https://stakfort.com/tailor/uploads/clients/body.png"
  );
  const [BodyImg_type, setBodyImg_type] = useState(null);

  // for images
  useEffect(() => {
    _retrieveData();
    getPermissionAsync();
  }, []);
  const _retrieveData = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      setUserToken(user_token);
    } catch (error) {
      console.log(error);
    }
  };

  const getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

 
  // Upload Face Image
  const _pickFaceImgGallery = async () => {
    setFaceModalVisible(!face_modal);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3]
      });
      if (!result.cancelled) {
        setFaceImg_uri(result.uri);
        // From here Preparing to Upload
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        setFaceImg_title(filename);
        // Infer the type of the image

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        setFaceImg_type(type);
        console.log(filename);
        console.log(type);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  // Upload Face Image
  const _pickFaceImgCamera = async () => {
    setFaceModalVisible(!face_modal);
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync(
        {
          quality : 0
        }
      );

      if (permissionResult.granted === false) {
        alert("لابد من السماح للتطبيق بالوصول للكاميرا لألتقاط الصور");
        return;
      }

      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        setFaceImg_uri(result.uri);
        // From here Preparing to Upload
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        setFaceImg_title(filename);
        // Infer the type of the image

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        setFaceImg_type(type);
        console.log(filename);
        console.log(type);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  // Upload Body Image
  const _pickBodyImgGallery = async () => {
    setBodyModalVisible(!body_modal);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3]
      });
      if (!result.cancelled) {
        setBodyImg_uri(result.uri);
        // From here Preparing to Upload
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        setBodyImg_title(filename);
        // Infer the type of the image

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        setBodyImg_type(type);
        console.log(filename);
        console.log(type);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };




  
  // Upload Body Image
  const _pickBodyImgCamera = async () => {
    setBodyModalVisible(!body_modal);
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("لابد من السماح للتطبيق بالوصول للكاميرا لألتقاط الصور");
        return;
      }
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        setBodyImg_uri(result.uri);
        // From here Preparing to Upload
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        setBodyImg_title(filename);
        // Infer the type of the image

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        setBodyImg_type(type);
        console.log(filename);
        console.log(type);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };


  const add_client = () => {
    let formData = new FormData();
    formData.append("tailor_token", user_token);
    formData.append("full_name", full_name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("city", city);
    formData.append("block", block);
    formData.append("street", street);
    formData.append("birthdate", birthdate);
    formData.append("kind", kind);
    if (FaceImg_type !== null && BodyImg_type !== null) {
      formData.append("face_img", {
        uri: FaceImg_uri,
        name: FaceImg_title,
        type: FaceImg_type
      });
      formData.append("body_img", {
        uri: BodyImg_uri,
        name: BodyImg_title,
        type: BodyImg_type
      });
    }

    SetLoading(true);
    fetch("https://stakfort.com/tailor/api/add_client.php", {
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
          alert(responseJson.message);
          SetLoading(false);
          navigation.navigate("ClientsRecord");
        } else {
          SetLoading(false);
          alert(responseJson.message);
        }
      });
  };

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
          justifyContent: "space-between"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Clients")}>
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
            name="ios-person-add"
            size={24}
            color="#FFF"
            style={{ marginHorizontal: 15 }}
          />
        </View>
      </View>

      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={face_modal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setFaceModalVisible(!face_modal);
                }}
                style={{ alignItems: "flex-start" }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalText}>صورة الوجة</Text>

              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                   onPress={() => _pickFaceImgCamera()}
                  style={{
                    backgroundColor: "#F9C227",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "45%",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="camera" size={24} color="#FFF" />
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Bold"
                    }}
                  >
                    الكاميرا
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                   onPress={() => _pickFaceImgGallery()}
                   style={{
                    backgroundColor: "#F9C227",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "45%",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="images" size={24} color="#FFF" />
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Bold"
                    }}
                  >
                    المعرض
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={body_modal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setBodyModalVisible(!body_modal);
                }}
                style={{ alignItems: "flex-start" }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalText}>صورة الجسم</Text>

              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                onPress={() => _pickBodyImgCamera()}
                  style={{
                    backgroundColor: "#F9C227",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "45%",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="camera" size={24} color="#FFF" />
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Bold"
                    }}
                  >
                    الكاميرا
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => _pickBodyImgGallery()}

                  style={{
                    backgroundColor: "#F9C227",
                    paddingVertical: 15,
                    borderRadius: 10,
                    width: "45%",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="images" size={24} color="#FFF" />
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Bold"
                    }}
                  >
                    المعرض
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
     
          <View>
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "auto",
                fontSize: 18,
                marginBottom: 5,
                color: "#922305"
              }}
            >
              الأسم بالكامل : (*)
            </Text>

            <TextInput
              defaultValue={contact_name}
              onChangeText={full_name => setFullname(full_name)}
              placeholder=" الأسم بالكامل"
              style={{
                height: 40,
                marginBottom: 20,
                borderBottomWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderColor: "grey",
                width: "100%",
                fontFamily: "Bold",
                textAlign: "right"
              }}
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "auto",
                fontSize: 18,
                marginBottom: 5,
                color: "#922305"
              }}
            >
              رقم الهاتف : (*)
            </Text>

            <TextInput
            defaultValue={number.replace(/\s/g, '').replace("+","")}
              onChangeText={phone => setPhone(phone)}
              placeholder=" رقم الهاتف"
              style={{
                height: 40,
                marginBottom: 20,
                borderBottomWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderColor: "grey",
                width: "100%",
                fontFamily: "Bold",
                textAlign: "right"
              }}
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "auto",
                fontSize: 18,
                marginBottom: 5,
                color: "#922305"
              }}
            >
              رقم المجلد : (*)
            </Text>
            <TextInput
              // onChangeText={street => setStreet(street)}
              placeholder="أدخل رقم المجلد الخاص بالعميل"
              style={{
                height: 40,
                marginBottom: 20,
                borderBottomWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderColor: "grey",
                width: "100%",
                fontFamily: "Bold",
                textAlign: "right"
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
              paddingHorizontal: 15
            }}
          >
            <Checkbox
              status={display ? "checked" : "unchecked"}
              onPress={() => {
                SetDisplay(!display);
              }}
            />
            <Text
              style={{
                fontFamily: "Bold",
                textAlign: "justify",
                color: "#F9C227",
                fontSize: 24
              }}
            >
              معلومات اضافية ؟
            </Text>
          </View>
        </View>

        {display &&
          <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
            <View>
              <Text
                style={{
                  fontFamily: "Bold",
                  textAlign: "auto",
                  fontSize: 18,
                  marginBottom: 5,
                  color: "#922305"
                }}
              >
                البريد الألكتروني :
              </Text>

              <TextInput
                onChangeText={email => setEmail(email)}
                placeholder="  البريد الألكتروني"
                style={{
                  height: 40,
                  marginBottom: 20,
                  borderBottomWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  textAlign: "right"
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Bold",
                  textAlign: "auto",
                  fontSize: 18,
                  marginBottom: 5,
                  color: "#922305"
                }}
              >
                المدينة :
              </Text>

              <TextInput
                onChangeText={city => setCity(city)}
                placeholder="أدخل المدينة التي يسكن فيها العميل"
                style={{
                  height: 40,
                  marginBottom: 20,
                  borderBottomWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  textAlign: "right"
                }}
              />
            </View>

            <View>
              <Text
                style={{
                  fontFamily: "Bold",
                  textAlign: "auto",
                  fontSize: 18,
                  marginBottom: 5,
                  color: "#922305"
                }}
              >
                الحي :
              </Text>
              <TextInput
                onChangeText={block => setBlock(block)}
                placeholder="أدخل الحي الخاص بالعميل"
                style={{
                  height: 40,
                  marginBottom: 20,
                  borderBottomWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  textAlign: "right",
                  fontSize: 13
                }}
              />
            </View>

            <View>
              <Text
                style={{
                  fontFamily: "Bold",
                  textAlign: "auto",
                  fontSize: 18,
                  marginBottom: 5,
                  color: "#922305"
                }}
              >
                الشارع :
              </Text>
              <TextInput
                onChangeText={street => setStreet(street)}
                placeholder="أدخل الشارع الخاص بالعميل"
                style={{
                  height: 40,
                  marginBottom: 20,
                  borderBottomWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  textAlign: "right"
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Bold",
                  textAlign: "auto",
                  fontSize: 18,
                  marginBottom: 5,
                  color: "#922305"
                }}
              >
                تاريخ الميلاد :
              </Text>
              <TouchableOpacity
                onPress={showDatepicker}
                style={{
                  flexDirection: "row",
                  height: 40,
                  borderBottomWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  paddingVertical: 1,
                  borderColor: "grey",
                  alignItems: "center"
                }}
              >
                <MaterialIcons name="date-range" size={30} color="grey" />

                <Text
                  style={{
                    textAlign: "right",
                    fontFamily: "Bold",
                    color: "grey",
                    marginLeft: 10
                  }}
                >
                  {birthdate.toString()}
                </Text>
              </TouchableOpacity>
              {show &&
                <DateTimePicker
                  dateFormat="dayofweek day month"
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />}
            </View>

            <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  textAlign: "auto",
                  fontSize: 18,
                  color: "#922305"
                }}
              >
                الصور :
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 20
              }}
            >
              <View style={{ paddingHorizontal: 5 }}>
                <TouchableOpacity
                  onPress={() => {
                    setFaceModalVisible(true);
                  }}
                >
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      resizeMode: "contain",
                      borderRadius: 10
                    }}
                    source={{ uri: FaceImg_uri }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: 5 }}>
                <TouchableOpacity
                  onPress={() => {
                    setBodyModalVisible(true);
                  }}
                >
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      resizeMode: "contain",
                      borderRadius: 10
                    }}
                    source={{ uri: BodyImg_uri }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>}
        <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={add_client}
            //  onPress={this.LoginUser}
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
      </ScrollView>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Bold"
  },
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
