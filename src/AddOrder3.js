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
  Modal,
  Platform,
  Button,
  ActivityIndicator
} from "react-native";
import { AntDesign, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { RadioButton, Switch } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
export default function AddOrder({ route, navigation }) {
  const [isLoading, SetLoading] = useState(false);

  const [checked, setChecked] = React.useState("first");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  // Creditials

  const {
    client_token,
    client_name,
    client_id,
    client_phone,
    full_name
  } = route.params;
  const [user_token, setUserToken] = useState("");

  // Date Data

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    set_deliver_date(currentDate.toString());
    console.log(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  // Order Main Data
  const [price, set_price] = useState("");
  const [deliver_date, set_deliver_date] = useState("");
  const [max_deliver, set_max_deliver] = useState("");
  const [urgent, set_urgent] = useState("");
  const [count, set_count] = useState("");
  const [custom_type, set_custom_type] = useState("");
  const [fabric_type, set_fabric_type] = useState("");

  // Sleeve Data
  const [slv_length, set_slv_length] = useState("");
  const [slv_width_top, set_slv_width_top] = useState("");
  const [slv_hand_type, set_slv_hand_type] = useState("");
  const [cup_type, set_cup_type] = useState("");
  const [cup_width, set_cup_width] = useState("");
  const [cup_length, set_cup_length] = useState("");
  const [slv_cup_length, set_slv_cup_length] = useState("");

  // Bocket Data
  const [bocket_type, set_bocket_type] = useState("");
  const [bocket_custom, set_bocket_custom] = useState("");
  const [chst_bocket_length, set_chst_bocket_length] = useState("");
  const [chst_bocket_depth, set_chst_bocket_depth] = useState("");
  const [mobile_bocket_length, set_mobile_bocket_length] = useState("");
  const [mobile_bocket_depth, set_mobile_bocket_depth] = useState("");

  // Neck Data
  const [neck_width, set_neck_width] = useState("");

  // Collar Data
  const [collar_type, set_collar_type] = useState("");

  useEffect(() => {
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const user_token = await AsyncStorage.getItem("user_token");
      setUserToken(user_token);
    } catch (error) {
      console.log(error);
    }
  };

  //  const submitInput = () => {
  // 	onChangeText={slv_length => set_slv_length(slv_length)}

  //   }

  const Add_Order = () => {
    let formData = new FormData();

    // Creditials
    formData.append("client_token", client_token);
    formData.append("tailor_token", user_token);
    formData.append("client_name", client_name);
    formData.append("client_phone", client_phone);
    // Order Main Data
    formData.append("price", price);
    formData.append("deliver_date", deliver_date);
    formData.append("max_deliver", max_deliver);
    formData.append("urgent", urgent);
    formData.append("count", count);
    formData.append("custom_type", custom_type);
    formData.append("fabric_type", fabric_type);

    // Sleeve Data

    formData.append("slv_length", slv_length);
    formData.append("slv_width_top", slv_width_top);
    formData.append("slv_hand_type", slv_hand_type);
    formData.append("cup_width", cup_width);
    formData.append("cup_length", cup_length);
    formData.append("cup_type", cup_type);
    formData.append("slv_cup_length", slv_cup_length);

    // Bocket Data
    formData.append("bocket_type", bocket_type);
    formData.append("bocket_custom", bocket_custom);
    formData.append("chst_bocket_length", chst_bocket_length);
    formData.append("chst_bocket_depth", chst_bocket_depth);
    formData.append("mobile_bocket_length", mobile_bocket_length);
    formData.append("mobile_bocket_depth", mobile_bocket_depth);

    // Neck Data
    formData.append("neck_width", neck_width);

    // Collar Data
    formData.append("collar_type", collar_type);
    SetLoading(true);
    fetch("https://stakfort.com/tailor/api/add_order.php", {
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
          navigation.navigate("Home");
          SetLoading(false);
        } else {
          alert(responseJson.message);
          SetLoading(false);
        }
      });
  };

  return (
    <View>
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
          <SimpleLineIcons
            name="arrow-right"
            size={30}
            color="#FFF"
            style={{ marginLeft: 10 }}
          />
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
            قائمة الطلبات
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 10,
            marginTop: 20
          }}
        >
          <View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontFamily: "Bold", fontSize: 16, color: "grey" }}>
                تفاصيل الوقت و السعر
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>السعر</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={price => set_price(price)}
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
                    paddingVertical: 1
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>تاريخ الأستلام</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 35,
                    borderWidth: 1.5,
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    borderColor: "grey",
                    width: "100%",
                    fontFamily: "Bold",
                    color: "grey",
                    borderRadius: 4,
                    paddingVertical: 1,
                    alignItems: "center"
                  }}
                >
                  <ScrollView horizontal>
                    <Text style={{ textAlign: "right" }}>
                      {deliver_date.toString()}
                    </Text>
                  </ScrollView>
                  <MaterialIcons name="date-range" size={24} color="grey" />
                </TouchableOpacity>

                {show &&
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    // onChange={deliver_date => set_deliver_date(deliver_date)}
                  />}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>أقصي زمن للتوصيل</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  onChangeText={max_deliver => set_max_deliver(max_deliver)}
                  style={{
                    height: 35,
                    borderWidth: 1.5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderColor: "grey",
                    width: "100%",
                    fontFamily: "Bold",
                    color: "grey",
                    borderRadius: 4
                  }}
                />
              </View>
            </View>

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
                <Text style={{ fontFamily: "ExtraBold" }}>أستلام عاجل</Text>
              </View>
              
              <View style={{ alignItems: "center" }}>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              </View>

            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 10,
            marginTop: 50
          }}
        >
          <View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontFamily: "Bold", fontSize: 16, color: "grey" }}>
                تفاصيل الثوب{" "}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>العدد</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  onChangeText={count => set_count(count)}
                  style={{
                    height: 35,
                    borderWidth: 1.5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderColor: "grey",
                    width: "100%",
                    fontFamily: "Bold",
                    color: "grey",
                    borderRadius: 4
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>اضافة قياسات الجسم</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Body", {
                      token: client_token,
                      id: client_id,
                      full_name: full_name
                    })}
                  style={{
                    backgroundColor: "#F9C227",
                    width: "100%",
                    height: 35,
                    borderRadius: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Bold",
                      textAlign: "center",
                      color: "#FFF"
                    }}
                  >
                    قياسات الجسم
                  </Text>
                  <AntDesign name="plus" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>نوع التفصيل</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={custom_type => set_custom_type(custom_type)}
                  style={{
                    height: 35,
                    borderWidth: 1.5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderColor: "grey",
                    width: "100%",
                    fontFamily: "Bold",
                    color: "grey",
                    borderRadius: 4
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}> نوع القماش </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={fabric_type => set_fabric_type(fabric_type)}
                  style={{
                    height: 35,
                    borderWidth: 1.5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderColor: "grey",
                    width: "100%",
                    fontFamily: "Bold",
                    color: "grey",
                    borderRadius: 4
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 10,
            marginTop: 50
          }}
        >
          <View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontFamily: "Bold", fontSize: 16, color: "grey" }}>
                تفاصيل الجيب
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>نوع الجيب</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={bocket_type => set_bocket_type(bocket_type)}
                  style={{
                    height: 35,
                    borderWidth: 1.5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderColor: "grey",
                    width: "100%",
                    fontFamily: "Bold",
                    color: "grey",
                    borderRadius: 4
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>نوع خياطة الجيب</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={bocket_custom =>
                    set_bocket_custom(bocket_custom)}
                  style={{
                    height: 35,
                    borderWidth: 1.5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderColor: "grey",
                    width: "100%",
                    fontFamily: "Bold",
                    color: "grey",
                    borderRadius: 4
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>طول جيب الصدر</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={chst_bocket_length =>
                    set_chst_bocket_length(chst_bocket_length)}
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
                    borderRadius: 4
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>عمق جيب الصدر</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={chst_bocket_depth =>
                    set_chst_bocket_depth(chst_bocket_depth)}
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
                    borderRadius: 4
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>طول جيب الجوال</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={mobile_bocket_length =>
                    set_mobile_bocket_length(mobile_bocket_length)}
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
                    borderRadius: 4
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                borderBottomWidth: 1,
                paddingBottom: 5,
                paddingTop: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>عمق جيب الجوال</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={mobile_bocket_depth =>
                    set_mobile_bocket_depth(mobile_bocket_depth)}
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
                    borderRadius: 4
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 10,
            marginTop: 50
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontFamily: "Bold", fontSize: 16, color: "grey" }}>
              تفاصيل الكم
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "black",
              borderBottomWidth: 1,
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>طول الكم</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                keyboardType="numeric"
                onChangeText={slv_length => set_slv_length(slv_length)}
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "black",
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingTop: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>وسع الكم أعلي</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                keyboardType="numeric"
                onChangeText={slv_width_top => set_slv_width_top(slv_width_top)}
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "black",
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingTop: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>نوع كفة الكم</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                onChangeText={slv_hand_type => set_slv_hand_type(slv_hand_type)}
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "black",
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingTop: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>نوع الكبك</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                onChangeText={cup_type => set_cup_type(cup_type)}
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "black",
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingTop: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>عرض الكبك</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                keyboardType="numeric"
                onChangeText={cup_width => set_cup_width(cup_width)}
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "black",
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingTop: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>طول الكم كبك</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                keyboardType="numeric"
                onChangeText={slv_cup_length =>
                  set_slv_cup_length(slv_cup_length)}
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "black",
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingTop: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>طول الكبك</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                keyboardType="numeric"
                onChangeText={cup_length => set_cup_length(cup_length)}
                style={{
                  height: 35,
                  borderWidth: 1.5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "grey",
                  width: "100%",
                  fontFamily: "Bold",
                  color: "grey",
                  borderRadius: 4
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 10,
            marginTop: 50
          }}
        >
          <View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontFamily: "Bold", fontSize: 16, color: "grey" }}>
                تفاصيل اللياقة
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "black",
                paddingBottom: 5
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>نوع اللياقة</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={collar_type => set_collar_type(collar_type)}
                  style={{
                    height: 35,
                    borderWidth: 1.5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderColor: "grey",
                    width: "100%",
                    fontFamily: "Bold",
                    color: "grey",
                    borderRadius: 4
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 10,
            marginTop: 50
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontFamily: "Bold", fontSize: 16, color: "grey" }}>
              تفاصيل الرقبة
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderColor: "black",
              borderBottomWidth: 1,
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>وسع الرقبة</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                onChangeText={neck_width => set_neck_width(neck_width)}
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
                  borderRadius: 4
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{ paddingHorizontal: 20, marginTop: 50, marginBottom: 200 }}
        >
          <TouchableOpacity
            onPress={() => Add_Order()}
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
                  اضافة
                </Text>
              : <ActivityIndicator size="large" color={"#FFF"} />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
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
