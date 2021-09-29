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
  const [show_erorr, SetErorr] = useState(false);

  // Creditials

  const {
    client_token,
    client_name,
    client_id,
    client_phone,
  } = route.params;
  const [user_token, setUserToken] = useState("");
  const [data, setData] = useState([]);

  // Date Data

    var today = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var current_date = today+" / "+month+" / "+year;
    
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    set_deliver_date(currentDate.getDate()+"-"+ (currentDate.getMonth() + 1) +"-"+currentDate.getFullYear());
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
  const [paid, set_paid] = useState("");
  const [deliver_date, set_deliver_date] = useState("");
  const [max_deliver, set_max_deliver] = useState("");
  const [count, set_count] = useState("");
  const [custom_type, set_custom_type] = useState("");
  const [fabric_type, set_fabric_type] = useState("");

  // Order Measurments
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
      const user_token = await AsyncStorage.getItem("user_token");
      setUserToken(user_token);
      let formData = new FormData();
      formData.append("token", client_token);

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


  
  const ValidateForm = () => {
    if (!deliver_date.trim() || !price.trim() || !custom_type.trim()) {
      SetErorr(true);
    }
    else
    {
      Add_Order();
    }
  }

  const Add_Order = () => {
    let formData = new FormData();

    // Creditials
    formData.append("client_token", client_token);
    formData.append("tailor_token", user_token);
    formData.append("client_name", client_name);
    formData.append("client_phone", client_phone);
    // Order Main Data
    formData.append("price", price);
    formData.append("paid", paid);
    formData.append("deliver_date", deliver_date);
    formData.append("max_deliver", max_deliver);
    formData.append("urgent", isSwitchOn.toString());
    formData.append("count", count);
    formData.append("custom_type", custom_type);
    formData.append("fabric_type", fabric_type);
    // Body Measurment
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
        <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
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
           اضافة طلب جديد
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
                paddingTop: 5,

               }}
             >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Bold" }}>المدفوع</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                  onChangeText={paid => set_paid(paid)}
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


{/* 
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
                      full_name: client_name
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
            </View> */}

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
                القياسات
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
                <Text style={{ fontFamily: "Bold" }}>الطول :</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%"
                }}
              >
                <TextInput
                 defaultValue={data.length}
                  onChangeText={length => set_length(length)}
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
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>الكتف :</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
                defaultValue={data.shoulder}
                onChangeText={shoulder => set_shoulder(shoulder)}
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
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}> اليد :</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
               defaultValue={data.hand}
                keyboardType="numeric"
                onChangeText={hand => set_hand(hand)}
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
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}> الوسع :</Text>
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
                keyboardType="numeric"
                onChangeText={width => set_width(width)}
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
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}> الرقبة :</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%"
              }}
            >
              <TextInput
               defaultValue={data.neck}
               keyboardType="numeric"
                onChangeText={neck => set_neck(neck)}
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
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}> سادة :</Text>
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
               defaultValue={data.sadah}
                onChangeText={sadah => set_sadah(sadah)}
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
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}> قلاب :</Text>
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
               defaultValue={data.kalab}
                onChangeText={kalab => set_kalab(kalab)}
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
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>وسع اليد :</Text>
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
               defaultValue={data.hand_width}
               onChangeText={hand_width => set_hand_width(hand_width)}
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
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>وسع الكبك :</Text>
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
               defaultValue={data.cup_width}
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
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}> الكبك :</Text>
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
               defaultValue={data.cup}
              onChangeText={cup => set_cup(cup)}
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
              paddingBottom: 5
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>وسع تحت :</Text>
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
               defaultValue={data.floor_width}
               onChangeText={floor_width => set_floor_width(floor_width)}
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

          <View style={{ marginVertical:20 }}>
        
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>نوع الكبك :</Text>
             
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>كبك</Text>

              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => setChecked("second")}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontFamily: "Bold" }}>سادة</Text>
              <RadioButton
                value="third"
                status={checked === "third" ? "checked" : "unchecked"}
                onPress={() => setChecked("third")}
              />
            </View>
          </View>
        </View>


        </View>
    </View>
        <View
          style={{ paddingHorizontal: 20, marginTop: 50, marginBottom: 200 }}
        >
         {show_erorr &&
                    <Text style={{ fontFamily: "Bold",color:'red',marginVertical:10,paddingHorizontal:10 }}>
                      من فضلك , لابد من اكمال بيانات الوقت و السعر و الثوب *
                    </Text>
              }
               
          <TouchableOpacity
            onPress={() => ValidateForm()}
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
